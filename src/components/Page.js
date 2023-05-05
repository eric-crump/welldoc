import { useParams } from "react-router-dom";
import Stack, { onEntryChange } from "../cstack";
import { useState, useEffect } from "react";

function Page(props){
    //
    // for live preview, make /pages/:page_id and /course/:uid/:page_id both work
    //
    const { page_id } = useParams();

    const [entry, setEntry] = useState({});

    async function getEntry() {
        console.log('page_id', page_id);
        if(page_id){
            let theEntry = await Stack.getElement(props.id, 'lesson_page');
            console.log('page entry', entry);
            setEntry(theEntry);
        }
    }

    useEffect(() => {
        onEntryChange(getEntry);
      }, []);

    useEffect(() => {
        getEntry();
    }, [props.id]);

    let elements = [];
    entry.page_options?.forEach(item => {
        //console.log('item', item) 
        if(item.hasOwnProperty('quiz')){
            let choices = [];
            item.quiz.choices?.forEach((choice, index) => {
                choices.push(
                    <div className="form-check" key={item.quiz._metadata.uid + index}> 
                        <input className="form-check-input" type="radio" name={item.quiz._metadata.uid} id={'id_' + index} />
                        <label className="form-check-label" htmlFor={'id_' + index}>
                            {choice}
                        </label>
                    </div>
                )
            })
            elements.push(
                <div key={item.quiz._metadata.uid}>
                    {choices}
                </div>
            )
        }
        else if(item.hasOwnProperty('text_block')){
            elements.push(
                <div dangerouslySetInnerHTML={{__html: item.text_block.lesson_content}} key={item.text_block._metadata.uid} {...item.text_block.$.lesson_content}>

                </div>
            )
        }
    })

    let images = [];
    entry.image?.forEach(image => {
        images.push(
            <img className="" src={image.url} key={image.uid} {...image.$.url}/>
        )
    })

    return(
        <div>
            <div className="vstack text-center mb-3">
                {images} 
            </div>
            {elements}
        </div>
    )
}

export default Page;