import React,{useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSelector } from 'react-redux';
import {getProducts} from '../features/productSlice';
import listPlugin from '@fullcalendar/list';
import { IoInformation } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import Parse from 'html-react-parser'



function Fullcalender() {

    const {products} = useSelector(state=> state.product)
    const [productss, setProductss] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())

        if (products) {
            setProductss(products)
        }
    }, [dispatch]);


    let event = [
        {
            // title : `${Parse('<i className="fas fa-tasks"></i>')} title`,
            title : 'title 1',
            date : '2022-08-14',
            url: 'www.google.com',
            color:'blue'
        }
    ]

    
  return (
    <div>
        <FullCalendar
        themeSystem='bootstrap5'
        plugins={[ dayGridPlugin, interactionPlugin  ]}
        aspectRatio={0.7}
        longPressDelay={1}
        eventClick={(info) =>{
            let eventObj = info.event
            console.log(eventObj);
            eventObj._def.extendedProps.uuid ? console.log('oke') : console.log('not oke')
            info.jsEvent.preventDefault()
        }}
        initialView="dayGridMonth"
        weekends={true}
        events={event}
        />
    </div>
  )
}

export default Fullcalender