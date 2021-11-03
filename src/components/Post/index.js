import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";
import { getUser } from "../../services/security";
import { format} from "date-fns";
import { api } from "../../services/api";
import Input from "../Input";
import Button from "../Button";

function Post({ data }) {
    let signedUser = getUser();

    const [showComents, setShowComents] = useState(false);
    const toggleComents = () => setShowComents(!showComents);

    const [coments, setComents] = useState(data.Answers);

    const [newAnswer, setnewAnswer] = useState({
        Student: signedUser,
        description: ""
    });

    const handleInput = (event) => {
        setnewAnswer({...newAnswer, [event.target.id]: event.target.value})
    }

    const handleSubmitAnswer = async (event) => {
        event.preventDefault();

        let idPost = data.id;
        let uri = `/questions/${idPost}/answers`;

        try{
            let newComent = await api.post(uri, {description: newAnswer.description});
            let newComent2 = {
                id: newComent.data.id,
                created_at: newComent.data.createdAt,
                description: newComent.data.description,
                Student: signedUser
            }
            setComents([...coments, newComent2]);   
            setnewAnswer({description: ""})
        } catch(error){
            alert(error);
        }

        
    };


    return (
        <CardPost>
            <header>
                <img src={imgProfile} alt="Foto de perfil" />
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "você" : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="imagem do post" />}
                <footer>
                    {data.Categories.map(c => <p>{c.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>
                    {
                        data.Answers.length === 0 ?
                            "Seja o primeiro a comentar" :
                            `${data.Answers.length} Comentário${data.Answers.length > 1 && "s"}`
                    }
                </h3>
                {showComents && (
                    <>
                    {coments.map(coment => <Coment coment={coment} key={data.Answers.id}/>)}
                    </>
                )}
                <form onSubmit={handleSubmitAnswer}>
                <div>
                    <Input id="description" required handler={handleInput} value={newAnswer.description}/>
                    <Button newAnswer={newAnswer}/>
                </div>
                </form>
            </footer>
        </CardPost>
    );
}

function Coment({ coment }) {

    return (
        <CardComent>
            <header>
                <img src={coment.Student.image} alt="Foto de perfil do aluno" />
                <div>
                    <p>por {coment.Student.name}</p>
                    <span>em {format(new Date(coment.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <p>{coment.description}</p>
        </CardComent>
    );
}

export default Post;