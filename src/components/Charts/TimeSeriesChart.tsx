import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { formatBookingDate } from '../../utils/utilFunctions';

type Props = {
  data: HotelBooking[]
}

// [day, visitorsCount]
type FormattedData = [Date, number]

const TimeSeriesChart = ({data}: Props) => {

  const [options] = useState({
		chart: {
      type: 'line',
      zoom: {
        enabled: true
      },
      // width: "90%"
		},
		xaxis: {
			type: 'datetime',
      title: {
        text: 'Day'
      }
		},
    yaxis: {
      title: {
        text: 'Visitors'
      }
    }
	})
	
	const [series, setSeries] = useState<{name:string,data: FormattedData[]}[]>([{
		name: 'visitors',
		data: []
	}])

  useEffect(()=>{
    const formattedData = formatData(data);
    setSeries([{
      name: 'visitors',
      data: formattedData
    }])
  },[data]);

  return (
    <div className='flex justify-center w-full h-[70vh]'>
      <div className='w-full'>
        <h2 className='font-bold text-lg'>Time Series: number of visitors per day</h2>
        <Chart options={options} series={series} type="line" width={"100%"} height={"100%"} />
      </div>
    </div>
  )
}

export default TimeSeriesChart

function formatData(data: HotelBooking[]):FormattedData[]{

  const dateVisitorMap:{
    [key:number] : number;
  } = {};

  data.forEach((booking) => {
    
    const bookingDate = formatBookingDate(booking);

    if (bookingDate !== null) {
      const timestamp = bookingDate.getTime(); // Get the timestamp of the date

      if (dateVisitorMap[timestamp]) {
        // If the date is already in the map, accumulate the visitor count
        dateVisitorMap[timestamp] += booking.adults + booking.babies + booking.children;
      } else {
        // Otherwise, initialize the visitor count for the date
        dateVisitorMap[timestamp] = booking.adults + booking.babies + booking.children;
      }
    }
  });

  // Convert the dateVisitorMap to an array of key-value pairs
  const rawData = Object.entries(dateVisitorMap);

  // Sort the array based on the Date keys
  rawData.sort((a, b) => (parseInt(a[0]) - parseInt(b[0])));

  const formattedData: FormattedData[] = rawData.map(entry => {
    return [new Date(parseInt(entry[0])),entry[1]];
  })

  return formattedData;
}