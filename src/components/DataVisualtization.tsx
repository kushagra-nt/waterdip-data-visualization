import {useEffect, useState} from 'react';
import allData from '../assets/data';
import TimeSeriesChart from './Charts/TimeSeriesChart';
import ColumnChart from './Charts/ColumnChart';
import Sparkline1 from './Charts/SparkLine1';
import SparkLine2 from './Charts/SparkLine2';
import { formatBookingDate } from '../utils/utilFunctions';

const DataVisual = () => {

	const [chartData, setChartData] = useState<HotelBooking[]>(allData);
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');

	useEffect(()=>{
		let filteredData = allData;

		if(startDate){
			const date = new Date(startDate);
			filteredData = filteredData.filter((entry) => {
				const bookingDate = formatBookingDate(entry);
				if(bookingDate!==null && bookingDate>=date)return true;
				else return false;
			})
		}

		if(endDate){
			const date = new Date(endDate);
			filteredData = filteredData.filter((entry) => {
				const bookingDate = formatBookingDate(entry);
				if(bookingDate!==null && bookingDate<=date)return true;
				else return false;
			})
		}

		setChartData(filteredData);
	},[startDate, endDate]);

    return (
		<div className='w-full justify-center align-middle my-10 px-10'>

			{/* date filter selection */}
			<div className='flex gap-5 justify-center flex-col sm:flex-row mx-3 mb-10 lg:divide-x-4 lg:divide-blue-300'>
				<div className='flex justify-center'>
					<h4 className='font-bold ml-3'>From:</h4>
					<input type="date" value={startDate} onChange={(e)=> {setStartDate(e.target.value)}} />
				</div>
				<div className='flex justify-center'>
					<h4 className='font-bold ml-4'>To:</h4>
					<input type="date" value={endDate} onChange={(e)=> {setEndDate(e.target.value)}} />
				</div>
			</div>

			{/* different charts */}
			<TimeSeriesChart data={chartData} />

			<hr className="h-px my-16 bg-gray-200 border-0 dark:bg-gray-700"></hr>

			<ColumnChart data={chartData} />

			<hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-700"></hr>

			<Sparkline1 data={chartData} />

			<hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-700"></hr>

			<SparkLine2 data={chartData} />
		</div>
    )
}

export default DataVisual