import { useNavigate, Link } from "react-router-dom";

function Homepage(props){
    const navigate = useNavigate();

    function selectCourse(id){
        navigate('/course/' + id);
    }

    console.log('homepage props', props);

    return(
        <div>
            <h1 className="text-center" {...props.entry?.$?.title}>{props.entry?.title}</h1>
            <img className="img-fluid" src={props.entry?.image?.url} {...props.entry?.image?.$?.url}/>
            <p {...props.entry?.$?.description}>{props.entry?.description}</p>
            <ul className="list-group">
                {props.entry?.lessons?.map((lesson) =>
                    <li className="list-group-item list-click" key={lesson.uid} onClick={() => selectCourse(lesson.uid)} {...lesson.$.title}>
                        {lesson.title}
                    </li>
                )}
            </ul>
        </div>
        
    )
}

export default Homepage;