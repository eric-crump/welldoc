import { useParams, useNavigate } from "react-router-dom";
import Stack, { onEntryChange } from "../cstack";
import { useState, useEffect, useMemo } from "react";
import Page from "./Page";

function Course(){
    const { uid, page_id } = useParams();
    const navigate = useNavigate();
    let pages = [];
    const [index, setIndex] = useState(-1);

    const [entry, setEntry] = useState({});

    async function getEntry() {
        let theEntry = await Stack.getElement(uid, 'curriculum_template');
        pages = entry.pages;

        console.log('course entry', entry);
        setEntry(theEntry); 
    }

    useEffect(() => {
        onEntryChange(getEntry);
    }, []);

    useMemo(() => {
        console.log('index:', index);
        if(index == -1){
            navigate('/course/' + uid);
        }
        else
            navigate('/course/' + uid + '/' + entry.pages[index].uid);
    }, [index]);

    function startCourse(){ 
            navigate('/course/' + uid + '/' + entry.pages[0].uid);
            setIndex(0);
    }

    function forward(){
        if(index < entry.pages.length - 1){
            setIndex(index + 1);
        }
    }

    function back(){
        setIndex(index - 1);
    }

    let images = [];
    entry.image?.forEach(image => {
        images.push(
            <img className="" src={image.url} key={image.uid} />
        )
    })

    if(index == -1){
        return(
            <div className="container-fluid">
                <div className="vstack text-center">
                    <h1 className="text-center">{entry?.title}</h1> 
                    <p className="text-center">{entry?.en_estimated_duration}</p> 
                    {images} 
                </div>
                
                <div className="row mt-3">
                    <div className="col text-center">
                        <button className="btn btn-primary" onClick={() => startCourse()}>Begin</button>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid">
                <Page id={entry.pages[index].uid}/>
                <div className="hstack">
                    <button className="btn btn-primary ms-auto" onClick={() => back()}>Back</button>
                    <button className="btn btn-primary me-auto ms-3" onClick={() => forward()}>Next</button>
                </div>
            </div>
        )
    }
}

export default Course;