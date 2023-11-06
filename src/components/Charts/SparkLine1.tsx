import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

type Props = {
  data: HotelBooking[]
}

// [day, visitorsCount]
type FormattedData = [Date, number]

type ChartOptions = {
  chart: {
    type: 'line',
    width: string,
    height: number,
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: boolean,
  },
  stroke: {
    curve: string,
  },
  xaxis: {
    labels: {
      show: boolean,
    },
  },
  yaxis: {
    labels: {
      show: boolean,
    },
  },
  title?: {
    text: number,
    offset: number,
    style: {
      fontSize: string
    }
  }
}

let total = 0;

const Sparkline1 = ({data}: Props) => {

  const [options, setOptions] = useState<ChartOptions>({
    chart: {
      type: 'line',
      width: '100%',
      height: 40,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
  })
	
	const [series, setSeries] = useState<{name:string,data: number[]}[]>([{
		name: 'visitors',
		data: []
	}])

  useEffect(()=>{
    total = 0;
    const formattedData = formatData(data);

    setSeries([{
      name: 'visitors',
      data: formattedData.map(entry => entry[1])
    }])

    setOptions(prev => ({
      ...prev,
      title: {
        text: total,
        offset: 0,
        style: {
          fontSize: '24px'
        }
      }
    }))

  },[data]);

  return (
    <div className='flex justify-center h-[70vh] w-full'>
      <div className='w-full'>
        <h2 className='font-bold text-lg mb-5'>Sparkline-1: Adult visitors</h2>
        <Chart options={options} series={series} type="line" width={"100%"} height={"100%"} />
      </div>
    </div>
  )
}

export default Sparkline1

function formatData(data: HotelBooking[]):FormattedData[]{
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const dateVisitorMap:{
    [key:number] : number;
  } = {};

  data.forEach((booking) => {
    const bookingMonth = monthNames.indexOf(booking.month);

    if (bookingMonth === -1) return;

    const bookingDate = new Date(booking.year, bookingMonth, booking.day);

    // to check if valid date,
    // eg: if date is 31 Feb then JavaScript Date makes it 3 March
    // so checking if the date is correct what we wanted
    if (bookingDate.getDate() === booking.day) {
      const timestamp = bookingDate.getTime(); // Get the timestamp of the date

      if (dateVisitorMap[timestamp]) {
        // If the date is already in the map, accumulate the visitor count
        dateVisitorMap[timestamp] += booking.adults;
      } else {
        // Otherwise, initialize the visitor count for the date
        dateVisitorMap[timestamp] = booking.adults;
      }
    }
  });

  // Convert the dateVisitorMap to an array of key-value pairs
  const rawData = Object.entries(dateVisitorMap);

  // Sort the array based on the Date keys
  rawData.sort((a, b) => (parseInt(a[0]) - parseInt(b[0])));

  const formattedData: FormattedData[] = rawData.map(entry => {
    total += entry[1];
    return [new Date(parseInt(entry[0])),entry[1]];
  })

  return formattedData;
}