import {Component, OnInit} from '@angular/core';
import {Chart} from "angular-highcharts";
import {LocationService} from "../../sahred/service/communService/location.service";
import {AuthService} from "../../security/serviceAuth/auth.service";
import {CategoriesAppartementService} from "../../sahred/service/appartemetService/categories-appartement.service";
import {AppartemetService} from "../../sahred/service/appartemetService/appartemet.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-charts-appartement',
  templateUrl: './charts-appartement.component.html',
  styleUrl: './charts-appartement.component.css'
})
export class ChartsAppartementComponent implements OnInit{

  pieChart: Chart|undefined ;
  locationsByMonth: any;
  lineChart: Chart | undefined;
  totalCars: number = 0;
  usedColors: string[] = [];



  constructor(private locationService: LocationService, protected authService: AuthService,private categoriesAppartementService:CategoriesAppartementService,private appartemetService:AppartemetService) {
  }

  ngOnInit() {
    this.getDataAndCreateChart();
    this.generatePieChart();
  }

  getDataAndCreateChart(): void {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const categories = months.map((month, index) => month + ' ' + (index + 1)); // Créer les catégories (mois)

    this.locationService.getLocationsByMonth().subscribe(data => {
      const locationData = data; // Utiliser les données directement

      const seriesData = months.map((month, index) => {
        return locationData[index + 1] || 0; // Utiliser les données de locationData, ou 0 si elles sont manquantes
      });

      this.createChart(categories, seriesData);
    });
  }

  createChart(categories: string[], data: number[]): void {
    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Nombre de Locations par Mois'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories // Utiliser les catégories (mois) dynamiques
      },
      series: [{
        type: 'line', // Préciser le type de série
        name: 'Nombre de Locations',
        data: data // Utiliser les données dynamiques (nombre de locations)
      }]
    });
  }


//pieChart = new Chart({
  // chart: {
  //  type: 'pie',
  //   plotShadow: false,
  //   },
  // credits: {
  //    enabled: false,
  //  },
  //  plotOptions: {
  //  pie: {
  //     innerSize: '99%',
  //   borderWidth: 10,
  //   borderColor: '',
  //  slicedOffset: 10,
  //     dataLabels: {
  //      connectorWidth: 0,
  //     },
  // },
  // title: {
  //  verticalAlign: 'middle',
  //    floating: true,
  //     text: 'Diseases',
  //  },

  //  legend: {
  //   enabled: false,
  //   },
  //   series: [
  //  {
  //      type: 'pie',
  //  data: [
  //      {name: 'COVID 19', y: 1, color: '#eeeeee'},
//        {name: 'HIV/AIDS', y: 2, color: '#393e46'},
  //        {name: 'EBOLA ', y: 3, color: '#00adb5'},
  //     },
  //  ],
  // })



  generatePieChart(): void {
    this.categoriesAppartementService.getAll().subscribe(categories => {
      const observables = categories.map(category => {
        return this.appartemetService.getByCategoriesAppartementLibelleAndPropAppartementUsername(category.libelle,this.authService.username);
      });

      forkJoin(observables).subscribe(dataForChart => {
        dataForChart.forEach(voitures => {
          this.totalCars += voitures.length; // Ajout du nombre de voitures dans chaque catégorie à totalCars
        });

        const formattedData = dataForChart.map((voitures, index) => {
          const category = categories[index];
          const percentage = (voitures.length / this.totalCars) * 100 ; // Utilisation de totalCars ici
          return {
            name: category.libelle,
            y: percentage ,
            color: this.getRandomColor()
          };
        });

        this.generateChart(formattedData);
      });
    });
  }

  generateChart(dataForChart: any[]): void {
    this.pieChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          innerSize: '99%',
          borderWidth: 10,
          borderColor: '',
          slicedOffset: 10,
          dataLabels: {
            connectorWidth: 0,
          },
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Categorie de App en % ',
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'pie',
          data: dataForChart,
        },
      ],
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color: string;
    let isUnique: boolean;

    do {
      color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      isUnique = !this.usedColors.includes(color);
    } while (!isUnique);

    this.usedColors.push(color); // Ajoutez la nouvelle couleur utilisée à usedColors
    return color;
  }


}




