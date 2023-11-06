import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

type Props = {
  data: HotelBooking[]
}

type FormattedData = {
    country: string,
    visitorsCount: number
}

type ChartOptions = {
  chart: {
    type: 'bar',
    height: number,
    width: string,
  },
  xaxis: {
    categories: string[],
    title: {
      text: 'Country'
    }
  },
  yaxis: {
    title: {
      text: 'Visitors',
    },
  },
}

const ColumnChart = ({data}: Props) => {

  const [options, setOptions] = useState<ChartOptions>({
    chart: {
      type: 'bar',
      height: 150,
      width: '100%'
    },
    xaxis: {
      categories: [],
      title: {
        text: 'Country'
      }
    },
    yaxis: {
      title: {
        text: 'Visitors',
      },
    },
	})
	
	const [series, setSeries] = useState<{name:string,data: number[]}[]>([{
		name: 'visitors per country',
		data: []
	}])

  useEffect(()=>{
    // updating chart data every time data changes

    const formattedData = formatData(data);

    setSeries([{
        name: 'visitors per country',
        data: formattedData.map(entry => entry.visitorsCount)
    }])

    setOptions({
      chart: {
        type: 'bar',
        height: 150,
        width: '100%'
      },
      xaxis: {
        categories: data.map((entry) => entry.country), 
        title: {
          text: 'Country'
        }
      },
      yaxis: {
        title: {
          text: 'Visitors',
        },
      },
    })
  },[data]);

  return (
    <div className='flex justify-center h-[70vh] w-full'>
      <div className='w-full'>
        <h2 className='font-bold text-lg'>Bar Graph: number of visitors per country</h2>
        <Chart options={options} series={series} type="line" width={"100%"} height={"100%"} />
      </div>
    </div>
  )
}

export default ColumnChart;

function formatData(data: HotelBooking[]):FormattedData[]{

  const CountryVisitorMap:{
    [key:string] : number;
  } = {};

  data.forEach((booking) => {

    if (CountryVisitorMap[booking.country]) {
        // If the country is already in the map, accumulate the visitor count
        CountryVisitorMap[booking.country] += booking.adults + booking.babies + booking.children;
    } else {
        // Otherwise, initialize the visitor count for the country
        CountryVisitorMap[booking.country] = booking.adults + booking.babies + booking.children;
    }
  });

  // Convert the CountryVisitorMap to an array of key-value pairs
  const formattedData = Object.entries(CountryVisitorMap).map(([country,visitorsCount]) => ({
    country: country,
    visitorsCount: visitorsCount
  }))

  return formattedData;
}