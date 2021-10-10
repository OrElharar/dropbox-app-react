import React from 'react';
import academyPhoto from "../../images/אקדמיה.png";
import courseImg from "../../images//לפטופ קורס.png";
import laptopimg from "../../images/מחשב.png";


const Home = () => (
    <div className="home">
        <div className="home__title">
            <div>Welcome to My Dropbox project</div>

            <div className="img-container">
                <img src={academyPhoto} alt="Academy" />
            </div>
        </div>
        <div className="home__body">
            <div className="home__body__partial">
                <h3>Upload everything* from anywhere</h3>
                <div className="img-container">
                    <img src={courseImg} alt="Online" />
                </div>
            </div>
            <div className="home__body__partial">
                <h6>*Current version support only jpg,doc,docx and pdf files </h6>
                <div className="img-containerl">
                    <img src={laptopimg} alt="Laptop" />
                </div>
            </div>
        </div>
    </div>
);

export default Home;