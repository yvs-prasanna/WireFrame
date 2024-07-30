import { Component } from "react";

import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css'

import { Bars } from 'react-loader-spinner'

import { FaImage } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import {v4 as uuidv4} from "uuid"

import "./index.css"

const initialList = [
    {displayText: "Mountains", id:1},
    {displayText: "Flowers", id: 2},
    {displayText: "Beaches", id: 3},
    {displayText: "Cities", id: 4}
]

class WireFrame extends Component{
    state={searchInput: '', imagesList: [], heading: "", isLoading: false}

    getImagesApi = async() => {
        const {searchInput} = this.state
        this.setState({isLoading : true})
        const accessKey = "txnTn3VTbeRQz3gLZdwQuY6gLA0tkXuGHrZtld7nMXE"
        const url = `https://api.unsplash.com/search/photos?query=${searchInput}`
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${accessKey}`
              }
        }
        const response = await fetch(url,options);
        const data = await response.json()
        console.log(data)
        const newImagesList = data.results.map(each => ({
            id: uuidv4(),
            url:each.urls.small,
            alt: each.alt_description,
            created_at: each.created_at,
            likes: each.likes,
            photographer: each.user.first_name + each.user.last_name

        }))
        this.setState({imagesList: newImagesList, isLoading: false})
    }
    
    renderLoader = () => {
        return(
            <Bars
        height="80"
        width="80"
        color="orange"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />

        )
    }

    onKeyDownEnter = event => {
        const {searchInput} = this.state
        if(event.key === "Enter"){
            this.getImagesApi()
            this.setState({heading: searchInput})
        }    
    }

    onChangeSearchInput = event => {
        this.setState({searchInput: event.target.value})
    }

    onClickInitialvalues = (event) => {
        this.setState({searchInput: event.target.value, heading: event.target.value})
    }

    renderImages = () => {
        const {imagesList} = this.state
        return(
            <ul className="All-Images-block">
                    {imagesList.map(each => (
                        <li className="eachList-item">
                            <Popup
                            trigger={
                                <img key={each.id} src={each.url} alt={each.alt} className="Each-image-block"/>
                            }
                            on="hover"
                            position="right"
                            arrow= "true"
                            className="whole-popup-block"
                            >
                                <div className="popup-block">
                                    <p className="popup-details"><span className="popup-heading">Title:</span>  {each.alt}</p>
                                    <p className="popup-details"><span className="popup-heading">ID:</span>  {each.id}</p>
                                    <p className="popup-details"><span className="popup-heading">Date:</span>  {each.created_at}</p>
                                    <p className="popup-details"><span className="popup-heading">Photographer:</span>  {each.photographer}</p>
                                    <p className="popup-details"><span className="popup-heading">Likes:</span>  {each.likes}</p>
                                </div>
                            </Popup>                        
                        </li>
                    ))}
                </ul> 
        )
    }

    render(){
        const {searchInput,heading, isLoading} = this.state
        return(
            <div className="wireframeWholeBlock">
                <div className="website-logo-block">
                    <FaImage className="website-logo"/>
                    <h1 className="website-name">WireFrame</h1>
                </div>
                <div className="search-block">
                    <input onKeyDown={this.onKeyDownEnter} type="search" value={searchInput} onChange={this.onChangeSearchInput}  placeholder="Enter the name of the Image" className="search-input"/>
                    <button className="search-button" onClick={this.getImagesApi}>
                        <FaSearch className="search-image"/>
                    </button>
                </div>
                <ul className="initialTexts">
                    {initialList.map(each => (
                        <button onClick={this.onClickInitialvalues} value={each.displayText} className="each-initial-button" type="button" key={each.id}>{each.displayText}</button>
                    ))}
                </ul>
                <h1 className="searchInput-heading">{heading}</h1>
                <hr className="hr"/>  
                {isLoading ? this.renderLoader() : this.renderImages()}     
            </div>
        )
    }
}

export default WireFrame