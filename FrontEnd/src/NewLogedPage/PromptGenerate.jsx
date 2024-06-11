import './AllNavs.css';
import './PromptGenerate.css';
import ploadyLogo from '../assets/tubeAI.logopsd.png'
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import OpenAI from "openai";
import loadingGen from '../assets/Dual Ring@1x-3.0s-200px-200px.gif'
import pako from 'pako';
import { ref,uploadBytes, getDownloadURL, getStorage} from "firebase/storage";
import { saveAs } from 'file-saver';
import fileDownload from 'js-file-download';

import axios from "axios";

import {app} from '../firebase-config';


const storage = getStorage(app);


export function PromptGenerate() {

    const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY , dangerouslyAllowBrowser: true});

    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state?.id || localStorage.getItem('id');


    console.log(id)

    useEffect(() => {
        if (!id) {
            navigate('/login');
        } else {
            localStorage.setItem('id', id);
        }

    }, [id, navigate]);

    const [user, setUser] = useState('');


    useEffect(() => {
        axios.post('https://proj-01-rep-backend1.onrender.com/getData',{
            id: id    
        })
          .then(res => {
            setUser(res.data)
            setCredits(res.data.credits)
            setCurrentIndex(res.data.history.length);
            console.log(res.data.history.length)
          });
      }, []);

      const [credits, setCredits] = useState(0);


      const videoRef = useRef(null);

      const [copyPopup, setCopyPopup] = useState(false);
      const [showPopup, setShowPopup] = useState(false);
      const [againReminder, setAgainReminder] = useState(false);

      const [durationPopup, setDurationPopup] = useState(false);



   

      const [svgClass, setSvgClass] = useState('chevron-down');

    const [check1, setCheck1] = useState(true);
    const [check2, setCheck2] = useState(true);
    const [check3, setCheck3] = useState(true);

    const [againBtn, setAgainBtn] = useState(false);

    const [dropSVG1, setDropSVG1] = useState('drop-svg');
    const [dropSVG2, setDropSVG2] = useState('drop-svg');
    const [dropSVG3, setDropSVG3] = useState('drop-svg');

    const [thumbnailProcess, setThumbnailProcess] = useState('check');
    const [titleProcess, setTitleProcess] = useState('check');
    const [descriptionProcess, setDescriptionProcess] = useState('check');
    const [transcriptionProcess, setTranscriptionProcess] = useState('check');

    const [generateBtnClass, setGenerateBtnClass] = useState('prompt-input-button');
    const [priceCounter, setPriceCounter] = useState(4);
    const [promptValue, setPromptValue] = useState('');
    const [finalPrompt, setFinalPrompt] = useState('');


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

      const [thumbnailRes, setThumbnailRes] = useState('1792x1024');
      const [thumbnailStyle, setThumbnailStyle] = useState('Normal');
      const [size1, setSize1] = useState(true);
        const [size2, setSize2] = useState(false);
        const [size3, setSize3] = useState(false);


    const [blob, setBlob] = useState('');
    let sendUrl = '';


    const [importedVideo, setImportedVideo] = useState('');

    const [purchase1, setPurchase1] = useState(false);
    const [purchase2, setPurchase2] = useState(true);
    const [purchase3, setPurchase3] = useState(false);


    const [deletingIndex, setDeletingIndex] = useState(null);


    const [settingClass, setSettingClass] = useState('settings-wrap');
    const [historyClass, setHistoryClass] = useState('history-wrap');

    const [currentIndex, setCurrentIndex] = useState(0);

    const [confirmDeleteClass, setConfirmDeleteClass] = useState('confirm-delete closed');
    const [deleteConfirmIndex, setdeleteConfirmIndex] = useState(null);


    function downloadImage(base64String, filename) {
        const element = document.createElement('a');
        element.setAttribute('href', `data:image/png;base64,${base64String}`);
        element.setAttribute('download', filename);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
    }

    const [buyCreditsState, setBuyCreditsState] = useState(false);

    const [logedNavClass, setLogedNavClass] = useState('loged-nav');

    const showDuration = () => {
        setDurationPopup(true);
      
        setTimeout(() => {
          setDurationPopup(false);
        }, 3000); // 2000 milliseconds = 2 seconds
      };



    useEffect(() => {
        const handleBeforeUnload = (event) => {
            console.log(currentIndex, user.history.length)
            if ((thumbnailProcess !== 'check' && titleProcess !== 'check' && descriptionProcess !== 'check') && (currentIndex == user.history.length || user.history.length == 0)) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [thumbnailProcess, titleProcess, descriptionProcess]);

      useEffect(() =>{
        let price = 0;

        if(thumbnailProcess == 'check' && titleProcess == 'check' && descriptionProcess == 'check'){
            setAgainBtn(false)

        if(check1 == true){
            price += 2;
        }
        if(check2 == true){
            price += 1;
        }
        if(check3 == true){
            price += 1;
        }

        if(importedVideo !== ''){
            price += 2;
        }

    } else{
        setPriceCounter(0);
    }
        setPriceCounter(price);



      },[check1,check2,check3,importedVideo])





      async function main1(chat) {

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Make one short 4 to 7 word and attention grabbing YouTube title for video with this description" + chat},
            ],
            model: "gpt-3.5-turbo",
        });

        const title = completion.choices[0].message.content.split(`"`)

        setTitle(title[1]);
        setTitleProcess('drop')

        console.log(currentIndex, user.history.length)
        if(currentIndex != user.history.length || user.history.length != 0){
        await axios.put('https://proj-01-rep-backend1.onrender.com/updateHistory/title', {
            id: id,
            title: title[1],
            titleProcess: 'drop',
            index: currentIndex
    })
    .then(res => {
        setUser(res.data)
    })
    .catch(err => {
        console.log(err)
    })
    



    }
}





    
    async function main2(wordNum, chat) {

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Make youtube video description with"+ wordNum+ " words from this short description" + chat},
            ],
            model: "gpt-3.5-turbo",
        });



        // finalDesc = completion.choices[0].message.content.split(`"`);
        

        setDescription(completion.choices[0].message.content);
        setDescriptionProcess('drop')

        console.log(currentIndex, user.history.length)
        if(currentIndex != user.history.length || user.history.length != 0){
            await axios.put('https://proj-01-rep-backend1.onrender.com/updateHistory/description', {
                id: id,
                description: completion.choices[0].message.content,
                descriptionProcess: 'drop',
                index: currentIndex
        })
        .then(res => {
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        }
    }
    
      async function imageGen(chat){
        console.log(thumbnailStyle, thumbnailRes)
        const image = await openai.images.generate({ model: "dall-e-3", prompt: "Make eye catching thumbnail, with" + thumbnailStyle + " art style , using this video description" + chat, n:1,size: thumbnailRes, response_format: 'b64_json' });
        setUrl(image.data[0].b64_json);
        setThumbnailProcess('drop')

        const byteCharacters = atob(image.data[0].b64_json);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob1 = new Blob([byteArray], {type: 'image/jpeg'});
        console.log(blob1)
        sendThumbnail(blob1);
        setBlob(blob1);

      }

      const updateCredits = async (credits, remove) => {

        setCredits(credits - remove);
        axios.put('https://proj-01-rep-backend1.onrender.com/updateCredits', {
            id: id,
            credits: credits - remove
    })

      }


        const generateBtn = (e) => {
            e.preventDefault();
            if(priceCounter != 0 && credits >= priceCounter && promptValue.length > 0){
                if(importedVideo !== ''){
                    const video = videoRef.current;
                    video.src = URL.createObjectURL(importedVideo);
                    video.onloadedmetadata = async() => {
                        if(video.duration < 1501){



                    
const videoData = new FormData();
videoData.append("videoFile", importedVideo);

setTranscriptionProcess('loading');

if(check1 == true){
    setThumbnailProcess('loading');
} else{
    setThumbnailProcess('btn close')
}

if(check2 == true){
    setTitleProcess('loading');
} else {
    setTitleProcess('btn close')
}

if(check3 == true){
    setDescriptionProcess('loading');
} else {
    setDescriptionProcess('btn close')
}

updateCredits(credits, priceCounter);

axios.post("https://proj-01-rep-backend1.onrender.com/send", videoData)
    .then((res) => { 
        setFinalPrompt(res.data);
        console.log(res.data)
        console.log(finalPrompt)
        setTranscriptionProcess('finished');
        if(check1 == true){
            setThumbnailProcess('loading');
            imageGen(res.data);
        } else{
            setThumbnailProcess('btn')
        }

        if(check2 == true){
            setTitleProcess('loading');
            main1(res.data);
        } else {
            setTitleProcess('btn')
        }

        if(check3 == true){
            setDescriptionProcess('loading');
            main2(40, res.data);
        } else {
            setDescriptionProcess('btn')
        }


    })
}else {
    showDuration();
}
} 

                } else {
                    setFinalPrompt(promptValue);
                    if(check1 == true){
                        setThumbnailProcess('loading');
                        imageGen(promptValue);
                    } else{
                        setThumbnailProcess('btn')
                    }
    
                    if(check2 == true){
                        setTitleProcess('loading');
                        main1(promptValue);
                    } else {
                        setTitleProcess('btn')
                    }
    
                    if(check3 == true){
                        setDescriptionProcess('loading');
                        main2(40, promptValue);
                    } else {
                        setDescriptionProcess('btn')
                    }
    
                updateCredits(credits, priceCounter);
                }

                

            }
        }

        useEffect(() => {


            if(credits < priceCounter){
                setGenerateBtnClass('prompt-input-button too-much');
        } else {
            if(thumbnailProcess == 'check' && titleProcess == 'check' && descriptionProcess == 'check' && promptValue.length > 0 && priceCounter != 0){
                setGenerateBtnClass('prompt-input-button');
            } else {
                setGenerateBtnClass('prompt-input-button disabled');
            }
        }

        if(thumbnailProcess == 'check' && titleProcess == 'check' && descriptionProcess == 'check'){
            setAgainBtn(false)
        } else {
            setAgainBtn(true)
        }


        }, [check1, check2, check3,titleProcess, descriptionProcess, thumbnailProcess, promptValue,credits,priceCounter])

        const checkout =  async() => {
            let whatBuy;
            let amount;
            if(purchase1){
                whatBuy = '411216'
                amount = 20;
            }else if(purchase2){
                whatBuy = '411217'
                amount = 50;
            }else{
                whatBuy = '411218'
                amount = 100;
            } 

                try{
                    const response = await axios.post('https://proj-01-rep-backend1.onrender.com/api/purchaseProduct', {
                        productId: whatBuy,
                        id: id,
                        amount: amount
                    });
            
            
            
                    window.open(response.data.checkoutUrl, '_blank')
                }catch(error){
                    console.log(error);
                
                }
              }

              const downloadImg = () => {
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'image.png');
                link.setAttribute('target', '_blank');
            
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              };

              const copyFunct = (what) =>{
                navigator.clipboard.writeText(what);
                setCopyPopup(true);
                setTimeout(() => {
                    setCopyPopup(false);
                }, 2000);
              }

const sendThumbnail = (blobb) => {
    return new Promise((resolve, reject) => {
        // Generate a unique name for the file using a timestamp
        const fileName = `image-${Date.now()}.png`;
        const imageRef = ref(storage, `ploady/images/${fileName}`);
        uploadBytes(imageRef, blobb).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((sUrl) => {
                console.log(currentIndex, user.history.length)
                if(currentIndex != user.history.length || user.history.length != 0){
                    axios.put('https://proj-01-rep-backend1.onrender.com/updateHistory/thumbnail', {
                        id: id,
                        thumbnail: sUrl,
                        thumbnailProcess: 'drop',
                        index: currentIndex
                })
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
                }
                setUrl(sUrl)
                sendUrl = sUrl;
                resolve(); // Resolve the Promise
            }).catch(reject); // Reject the Promise if there's an error
        }).catch(reject); // Reject the Promise if there's an error
    });
}


              const againFunc = async(e) => {
                e.preventDefault();





                console.log(currentIndex, user.history.length - 1)
                setCurrentIndex(user.history.length);
                if(currentIndex > user.history.length - 1 || user.history.length == 0){       
                    await axios.put('https://proj-01-rep-backend1.onrender.com/addHistory', {
                        id: id,
                        history: {title: title, description: description, thumbnail: url, prompt: finalPrompt, thumbnailProcess, titleProcess, descriptionProcess, transcriptionProcess}
        
                  })
              .then(res => {
                    console.log(res)
                    setUser(res.data)
                    setCurrentIndex(res.data.history.length);
                    console.log(res.data.history.length)
              })
                .catch(err => {
                    console.log(err)
                })
            }
        



                setCheck1(true);
                setCheck2(true);
                setCheck3(true);
                setDropSVG1('drop-svg');
                setDropSVG2('drop-svg');
                setDropSVG3('drop-svg');
                setThumbnailProcess('check');
                setTitleProcess('check');
                setDescriptionProcess('check');
                setGenerateBtnClass('prompt-input-button');
                setPriceCounter(4);
                setPromptValue('');
                setAgainBtn(false);
                setAgainReminder(false);
                setTranscriptionProcess('check');
                setImportedVideo('');
                setFinalPrompt('');

            }

            const deleteHistory = async(index) => {

                await axios.put('https://proj-01-rep-backend1.onrender.com/deleteHistory', {
                    id: id,
                    index: index
                })
                .then(res => {
                    setUser(res.data)
                    if(index == currentIndex){
                        setCurrentIndex(user.history.length-1)
    
                        setCheck1(true);
                        setCheck2(true);
                        setCheck3(true);
                        setDropSVG1('drop-svg');
                        setDropSVG2('drop-svg');
                        setDropSVG3('drop-svg');
                        setThumbnailProcess('check');
                        setTitleProcess('check');
                        setDescriptionProcess('check');
                        setGenerateBtnClass('prompt-input-button');
                        setPriceCounter(4);
                        setPromptValue('');
                        setAgainBtn(false);
                        setAgainReminder(false);
                        setTranscriptionProcess('check');
                        setImportedVideo('');
                        setFinalPrompt('');
    
                    }
                    setDeletingIndex(null);
                    setdeleteConfirmIndex(null)
                    



                })
                .catch(err => {
                    console.log(err)
                })


            }

            const addHistory = async() => {
                await axios.put('https://proj-01-rep-backend1.onrender.com/addHistory', {
                    id: id,
                    history: {title: title, description: description, thumbnail: url, prompt: finalPrompt, thumbnailProcess, titleProcess, descriptionProcess, transcriptionProcess}
    
              })
          .then(res => {
                setUser(res.data)
          })
            .catch(err => {
                console.log(err)
            })
            }






            //   const MAX_RETRIES = 3;
            //   let retryCount = 0;
              
            //   const urlToBase64 = () => {
            //     return new Promise((resolve, reject) => {
            //       const imageRef = ref(storage, `ploady/images/${blob}`);
            //       uploadBytes(imageRef, blob).then((snapshot) => {
            //         console.log('Uploaded a blob or file!');
            //         getDownloadURL(snapshot.ref).then((downloadUrl) => {
            //           urlToBase64(downloadUrl).then((base64) => {
            //             console.log(base64);
            //             resolve();
            //           }).catch((error) => {
            //             if (error.code === 429 && retryCount < MAX_RETRIES) {
            //               retryCount++;
            //               setTimeout(() => urlToBase64(), 1000 * retryCount); // Wait and retry
            //             } else {
            //               reject(error);
            //             }
            //           });
            //         }).catch(reject);
            //       }).catch(reject);
            //     });
            //   }


              const setHistory = async(index) => {
                if(thumbnailProcess != "loading" && titleProcess != "loading" && descriptionProcess != "loading"){

                if((thumbnailProcess != "check" && titleProcess != "check" && descriptionProcess != "check") && (currentIndex == user.history.length || user.history.length == 0)){
                addHistory();
                }
                setCurrentIndex(index);
                setThumbnailProcess(user.history[index].thumbnailProcess);
                setTitleProcess(user.history[index].titleProcess);
                setDescriptionProcess(user.history[index].descriptionProcess);
                setTitle(user.history[index].title);
                setDescription(user.history[index].description);
                setUrl(user.history[index].thumbnail);
                setTranscriptionProcess(user.history[index].transcriptionProcess);
                setPromptValue(user.history[index].prompt);
                setFinalPrompt(user.history[index].prompt);
                setDropSVG1('drop-svg');
                setDropSVG2('drop-svg');
                setDropSVG3('drop-svg');
                setAgainBtn(true);
                setImportedVideo('');
            }

              }


            
    //      useEffect(() => {
    //     console.log(url)
    //     if (url.includes("https://")) {
    //       axios.post("https://proj-01-rep-backend1.onrender.com/convertUrl", {
    //           url: url
    //       })
    //       .then(res => {
    //           console.log(`${res.data.key}.jpg`)
    //         setDownloadUrl(`${res.data.key}.jpg`);
    //         console.log(downloadUrl)
    //       })
    //       .catch((err) => {
    //           console.log(err);
    //       })
    //     }
    //   }, [url]);   
    
    
    // log url ever 2s


            

    const handleDownload = async () => {
        const imageRef = ref(storage, url);
        getDownloadURL(imageRef)
        .then((url) => {
            axios.get(url, {
                responseType: 'blob',
            })
            .then((res) => {
                fileDownload(res.data, 'thumbnail.jpg');
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const [activeDropdown, setActiveDropdown] = useState(null);



useEffect(() => {
    const intervalId = setInterval(() => {
        console.log(currentIndex);
    }, 3000); // Log currentIndex every 3 seconds

    return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
    };
}, [currentIndex]);


const [selectedRes, setSelectedRes] = useState('wide-res');

const handleChangeRes = (event) => {
    setSelectedRes(event.target.value);
    switch (event.target.value) {
        case 'wide-res':
            setThumbnailRes('1792x1024');
            break;
        case 'short-res':
            setThumbnailRes('1024x1792');
            break;
        case 'square-res':
            setThumbnailRes('1024x1024');
            break;
        default:
            break;
    }
};

const [selectedStyle, setSelectedStyle] = useState('normal');

const handleChangeStyle = (event) => {
    setSelectedStyle(event.target.value);
    switch (event.target.value) {
        case 'normal':
            setThumbnailStyle('normal');
            break;
        case 'cartoon':
            setThumbnailStyle('cartoon');
            break;
        case 'realistic':
            setThumbnailStyle('realistic');
            break;
        default:
            break;
    }
};






    return(
        <div className="Prompt-Generate" onClick={() => {setHistoryClass('history-wrap'); setSettingClass('settings-wrap'); setLogedNavClass('loged-nav closed')}}>
            {copyPopup && <div className="copy-popup">Copied</div>}
            {durationPopup && <div className="duration-popup">Video must be less than 25 minutes</div>}





            {buyCreditsState && 
            <>
                <div className="overlay" onClick={() => setBuyCreditsState(false)}>
                <div className="purchase-pop" onClick={(e) => e.stopPropagation()}>
        
                    <div className='head-text'>
                        <h2>Credits</h2>
                        <p>Chose ploady credits package</p>
                        <p className='close-purchase' onClick={() => setBuyCreditsState(false)}>x</p>
                    </div>
                    <div className='chose-plan'>
                        <div className='one-plan' onClick={() => {setPurchase1(true); setPurchase2(false); setPurchase3(false)}}>
                            <div className='left'>
                                <h2>20 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></h2>
                            </div>
                            <div className='right'>
                                <h2><span>$</span>4.99</h2>
                                <input type="radio" checked={purchase1} />
                            </div>
                        </div>
                        <div className='one-plan' onClick={() => {setPurchase2(true); setPurchase1(false); setPurchase3(false)}}>
                            <div className='left'>
                                <h2>50 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></h2>
                                <p className='most-popular'>Most Popular</p>
                            </div>
                            <div className='right'>
                                <h2><span>$</span>9.99</h2>
                                <input type="radio" checked={purchase2} />
                            </div>
                            </div>
                            <div className="one-plan" onClick={() => {setPurchase3(true); setPurchase2(false); setPurchase1(false)}}>
                            <div className='left'>
                                <h2>100 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></h2>
                                </div>
                                <div className='right'>
                                <h2><span>$</span>17.99</h2>
                                <input type="radio" checked={purchase3} />
                                </div>
                                </div>
                    </div>
                    <div className='confirm-plan'>
                        <button className='confirm-btn' onClick={() => checkout()}>Purchase</button>
                    </div>
                </div>
                </div>
            </>
            }
            <div className='logo-nav' onClick={(e) => e.stopPropagation()}>
            <img src={ploadyLogo} alt="ploadyLogo" className="ploady-logo"/>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {if(logedNavClass == 'loged-nav' || logedNavClass == 'loged-nav closed'){setLogedNavClass('loged-nav clicked')}else if(logedNavClass == 'loged-nav clicked'){setLogedNavClass('loged-nav closed')}}} className='menu-svg' viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
            <div className="credits-wrap">
                <div className='nav-credits'>
                    {credits}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg>
                </div>
                <button className='credit-buy' onClick={() => setBuyCreditsState(true)}>Buy <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button>
            </div>
                </div>
                <div className={logedNavClass} onClick={(e) => e.stopPropagation()}>
                <div className="chose-all-links">
            <a href="" onClick={ (e) => e.preventDefault()} className='chose-nav selected'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>panorama-variant-outline</title><path d="M21 4C20.4 4 17.4 5.5 12 5.5C6.7 5.5 3.5 4 3 4C2.5 4 2 4.4 2 5V19C2 19.6 2.5 20 3 20C3.6 20 6.5 18.5 12 18.5C17.4 18.5 20.4 20 21 20C21.5 20 22 19.6 22 19V5C22 4.4 21.5 4 21 4M20 17.6C18 17 15.4 16.5 12 16.5C8.6 16.5 6 17 4 17.6V6.4C6.6 7.1 9.3 7.5 12 7.5C15.4 7.5 18 7 20 6.4V17.6M9.2 11L5.5 15.4C7.5 15.1 9.7 15 12 15C14.3 15 16.5 15.1 18.5 15.4L14 10L11.2 13.4L9.2 11Z" /></svg> Thumbnails</a>
            <Link href="#" onClick={(e) => e.preventDefault()} className='chose-nav soon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-video-outline</title><path d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M16,18L13.5,16.3V18H8V13H13.5V14.7L16,13V18Z" /></svg> Shorts (Soon)</Link>
                </div>
            
                <div className='wrapper'>
                <div className='profile-down' onClick={() => {setShowPopup(prevState => !prevState); if(svgClass == 'chevron-down'){setSvgClass('chevron-down up')}else if(svgClass == 'chevron-down up'){setSvgClass('chevron-down down')}else{setSvgClass('chevron-down up')}}}>
  <p>{user.firstName}</p>
  <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
</div>

  {showPopup && (
    <div className='logout'>
        <a href="/" onClick={() => {localStorage.removeItem("id")}}>Log Out</a>
    </div>
  )}
</div>
                </div>
                <div className='prompt-main'>
<div onClick={(e) => e.stopPropagation()} className={`right-slide ${settingClass.includes('open') || historyClass.includes('open') ? 'open' : ''}`}>
                    <div className="right-slide-col">
                        <div className={settingClass} onClick={() => {if(settingClass == 'settings-wrap'){setSettingClass('settings-wrap open first'); setHistoryClass('history-wrap no first')}else if(settingClass == 'settings-wrap no first'){setSettingClass('settings-wrap open'); setHistoryClass('history-wrap no')}else if(settingClass == 'settings-wrap open'){setSettingClass('settings-wrap'); setHistoryClass('history-wrap')}else if(settingClass == 'settings-wrap no'){setSettingClass('settings-wrap open');setHistoryClass('history-wrap no')}else if(settingClass == 'settings-wrap open first'){setSettingClass('settings-wrap'); setHistoryClass('history-wrap')}}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
                        </div>
                        <div className={historyClass} onClick={() => {if(historyClass == 'history-wrap'){setHistoryClass('history-wrap open first'); setSettingClass('settings-wrap no first')}else if(historyClass == 'history-wrap no first'){setHistoryClass('history-wrap open'); setSettingClass('settings-wrap no')}else if(historyClass == 'history-wrap open'){setHistoryClass('history-wrap');setSettingClass('settings-wrap');}else if(historyClass == 'history-wrap no'){setHistoryClass('history-wrap open'); setSettingClass('settings-wrap no')}else if(historyClass == 'history-wrap open first'){setSettingClass('settings-wrap'); setHistoryClass('history-wrap')}}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>history</title><path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" /></svg>
                        </div>
                    </div>
                    {historyClass == 'history-wrap open first' || historyClass == 'history-wrap open' ? (
                                            <div className='expanded-slide'>
                                                <div className='title'>
                                                    <h1>History</h1>
                                                </div>
                                                <div className='history-cards'>
<div className={currentIndex > user.history.length-1 ? 'add-card closed' : 'add-card'} onClick={(e) => { if(currentIndex <= user.history.length-1) againFunc(e) }}>
  <h2>+</h2>
</div>



                                            {[...user.history].reverse().map((historyItem, index) => {
                                                const reversedIndex = user.history.length - 1 - index;
                                                console.log(`currentIndex: ${currentIndex}, reversedIndex: ${reversedIndex}`);
                                                return (
                                                <div key={reversedIndex} className="history-flex">
                                                    <div className={`history-one ${currentIndex === reversedIndex ? 'current' : ''} ${deletingIndex === reversedIndex ? 'deleting' : ''}`} 
                                                        onClick={() => setHistory(reversedIndex)}>
                                                    <p>
                                                        {historyItem.prompt.length > 24
                                                        ? `${historyItem.prompt.substring(0, 24)}...`
                                                        : historyItem.prompt}
                                                                                        {deleteConfirmIndex === reversedIndex && (
                                                        <div className={confirmDeleteClass}>
                                                            <button className='cancle-sure' onClick={(e) => {e.stopPropagation(); setConfirmDeleteClass('confirm-delete closed'); setdeleteConfirmIndex(null);setDeletingIndex(null)}}>Cancle</button>
                                                            <button className='delete-sure' onClick={(e) => {e.stopPropagation(); deleteHistory(deleteConfirmIndex)}}>Delete</button>
                                                        </div>
                                                    )
                                                        }
                                                    </p>
                    
     
                                                    </div>
                                                    <svg className='trash-can' onClick={() => { setDeletingIndex(reversedIndex); setConfirmDeleteClass('confirm-delete opened'); setdeleteConfirmIndex(reversedIndex)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>

                                                </div>
                                                );
                                            })}
                                        </div>
  
                    
                                        </div>
                    ) : settingClass == 'settings-wrap open first' || settingClass == 'settings-wrap open' ? (
                        <div className='expanded-slide'>
                            <div className="title">
                                <h1>Settings</h1>
                            </div>
                            <div className='settings-part'>

                            <div className="dropdown">
                                <p>Thumbnail Resolution</p>

        <div
          onClick={() => {
            setActiveDropdown(activeDropdown !== 'dropdown1' ? 'dropdown1' : null);
          }}
          className="dropdown-btn"
        >
          {thumbnailRes}
          <span
            className={activeDropdown === 'dropdown1' ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: activeDropdown === 'dropdown1' ? "block" : "none" }}
        >
          <div
            onClick={(e) => {
              setThumbnailRes(e.target.textContent);
              setActiveDropdown(null);
            }}
            className="item"
          >
            1792x1024
          </div>
          <div
            className="item"
            onClick={(e) => {
              setThumbnailRes(e.target.textContent);
              setActiveDropdown(null);
            }}
          >
            1024x1792
          </div>
          <div
            className="item"
            onClick={(e) => {
             setThumbnailRes(e.target.textContent);
              setActiveDropdown(null);
            }}
          >
            1024x1024
          </div>
        </div>
      </div>

      <div className="dropdown">
      <p>Thumbnail Style</p>
        <div
          onClick={() => {
            setActiveDropdown(activeDropdown !== 'dropdown2' ? 'dropdown2' : null);
          }}
          className="dropdown-btn"
        >
          {thumbnailStyle}
          <span
            className={activeDropdown === 'dropdown2' ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: activeDropdown === 'dropdown2' ? "block" : "none" }}
        >
          <div
            onClick={(e) => {
              setThumbnailStyle(e.target.textContent);
              setActiveDropdown(null);
            }}
            className="item"
          >
            Normal
          </div>
          <div
            className="item"
            onClick={(e) => {
                setThumbnailStyle(e.target.textContent);
              setActiveDropdown(null);
            }}
          >
            Cartoon
          </div>
          <div
            className="item"
            onClick={(e) => {
                setThumbnailStyle(e.target.textContent);
              setActiveDropdown(null);
            }}
          >
            Realistic
          </div>
        </div>
      </div>
                                </div>
                            </div>

                     



                    ) : null
                        
                    }

                 </div>

                    <div className='main-part'>
                        {importedVideo != '' ?                    
                         <div className='one-choice transcription'>
                        <div className="content-wrap">
                            <h1>Transcription</h1>


                        </div>
                        {transcriptionProcess == 'check' ? (
                        <div className='already-checked'>


                        </div>) :
                         transcriptionProcess == 'loading' ? ( 
                              <img className='loading-gen' src={loadingGen} />
                        ) : transcriptionProcess == 'finished' ? (
                            <svg className="finished-transcription" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                        ) : null

                        }

                        </div> : null}


                        <div className='one-choice' onClick={() => {if(check1 == false){setCheck1(true)}else{setCheck1(false)} if(thumbnailProcess == 'drop'){if(dropSVG1 == 'drop-svg'){setDropSVG1('drop-svg up'); setDropSVG2('drop-svg down'); setDropSVG3('drop-svg down')}else if(dropSVG1 == 'drop-svg down'){setDropSVG1('drop-svg up'); setDropSVG2('drop-svg down'); setDropSVG3('drop-svg down')}else{setDropSVG1('drop-svg down')}}}}>
                        <div className="content-wrap">
                            <h1>Thumbnail</h1>
                            {dropSVG1 == 'drop-svg up' ? (
                                <>  
                                <img src={url} alt="" className='generated-img' onClick={(e) => {e.stopPropagation();}} />
                                <a className='content-btn' onClick={(e) => {e.stopPropagation(); handleDownload()}}>Download Image</a>
                                </>
                                ) : null
                                }

                        </div>
                        {thumbnailProcess == 'check' ? ( 
                                                <div className="checkbox-wrapper-6">
                                                <input className="tgl tgl-light"  type="checkbox" checked={check1} />
                                                <label className="tgl-btn"  />
                                            </div>
                        ) : thumbnailProcess == 'loading' ? ( <img className='loading-gen' src={loadingGen} />
                        ) : thumbnailProcess == 'btn' && credits >= 2 ? (
                        <button type="submit" className='again-btn' onClick={() => {setThumbnailProcess('loading'); imageGen(finalPrompt); updateCredits(credits, 2)}}>2 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button> 
                        ) : (thumbnailProcess == 'btn close' || credits < 2) && thumbnailProcess != "drop"? (   <button type="submit" className='again-btn close' disabled onClick={(e) => e.preventDefault()}>2 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button> ) : ( <svg className={dropSVG1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>)

                        }

                        </div>
                        <div className='one-choice'  onClick={() => {if(check2 == false){setCheck2(true)}else{setCheck2(false)} if(titleProcess == 'drop'){if(dropSVG2 == 'drop-svg'){setDropSVG2('drop-svg up'); setDropSVG1('drop-svg down'); setDropSVG3('drop-svg down')} else if(dropSVG2 == 'drop-svg down'){setDropSVG2('drop-svg up'); setDropSVG1('drop-svg down'); setDropSVG3('drop-svg down')}else{setDropSVG2('drop-svg down')} }}}>
                        <div className="content-wrap">
                            <h1>Title</h1>
                            {dropSVG2 == 'drop-svg up' ? (
                                <>
                                <p className='appear' onClick={(e) => {e.stopPropagation();}}>{title}</p>
                                <button className='content-btn' onClick={(e) => {
                                e.stopPropagation();
                                copyFunct(title);
                                }}>
                                Copy
                                </button>
                                </>         
                                ) : null
                                }

                        </div>
                        {titleProcess == 'check' ? (
                            <div className="checkbox-wrapper-6">
                                <input className="tgl tgl-light"  type="checkbox" checked={check2} />
                                <label className="tgl-btn"  />
                            </div> ) : titleProcess == 'loading' ? ( <img className='loading-gen' src={loadingGen} />
                            ) : titleProcess == 'btn'  && credits >= 1 ? ( 
                            <button type="submit" className='again-btn' onClick={() => {setTitleProcess('loading'); main1(finalPrompt); updateCredits(credits, 1)}}>1 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button> 
                             ) : (titleProcess == 'btn close' || credits < 1) && titleProcess != "drop" ?( <button type="submit" disabled className='again-btn close' onClick={(e) => e.preventDefault()}>1 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button> ) : ( <svg className={dropSVG2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>)
                            }

                        </div>
                        <div className='one-choice'  onClick={() => {if(check3 == false){setCheck3(true)}else{setCheck3(false)} if(descriptionProcess == 'drop'){if(dropSVG3 == 'drop-svg'){setDropSVG3('drop-svg up'); setDropSVG1('drop-svg down'); setDropSVG2('drop-svg down')} else if(dropSVG3 == 'drop-svg down'){setDropSVG3('drop-svg up'); setDropSVG1('drop-svg down'); setDropSVG2('drop-svg down')}else{setDropSVG3('drop-svg down')}}}}>
                        <div className="content-wrap">
                            <h1>Description</h1>
                            {dropSVG3 == 'drop-svg up' ? (
                                <>
                                <p className='appear' onClick={(e) => {e.stopPropagation();}}>{description}</p>
                                <button className='content-btn' onClick={(e) => {
                                e.stopPropagation();
                                copyFunct(description);
                                }}>
                                Copy
                                </button>
                                </>
                                ) : null
                                }

                        </div>
                        {descriptionProcess == 'check' ? (
                        <div className="checkbox-wrapper-6">
                            <input className="tgl tgl-light"  type="checkbox" checked={check3} onClick={() => {if(check3 == false){setCheck3(true)}else{setCheck3(false)} if(dropSVG3 == 'drop-svg'){setDropSVG3('drop-svg up'); setDropSVG2('drop-svg down'); setDropSVG1('drop-svg down')} else if(dropSVG3 == 'drop-svg down'){setDropSVG3('drop-svg up'); setDropSVG2('drop-svg down'); setDropSVG1('drop-svg down')}else{setDropSVG3('drop-svg down')} }}/>
                            <label className="tgl-btn"  />
                        </div>
                        ) : descriptionProcess == 'loading' ? ( <img className='loading-gen' src={loadingGen} />
                        ) : descriptionProcess == 'btn'  && credits >= 2 ?  (
                        <button type="submit" className='again-btn' onClick={() => {setDescriptionProcess('loading'); main2(40, finalPrompt); updateCredits(credits, 1)}}>1 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button> 
                        ) : (descriptionProcess == 'btn close' || credits < 1) && descriptionProcess != "drop" ? (  <button type="submit" disabled className='again-btn close' onClick={(e) => e.preventDefault()}>1 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star-four-points</title><path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" /></svg></button> ) : ( <svg className={dropSVG3} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>)
                        }
                        </div>
                    </div>
                    <form className='prompt-input'>

   <div className="input-container">
             {thumbnailProcess === 'check' && descriptionProcess === 'check' && titleProcess === 'check' ? (
    <label htmlFor="file-input">
                <svg className='input-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>paperclip</title>
                <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
            </svg>
            <input onChange={(e) => {setImportedVideo(e.target.files[0]); setPromptValue(e.target.files[0].name); console.log(e.target.files[0])}} accept='video/mp4' type="file" id="file-input" className='hidden-file-input'/>
    </label>
             ) : (<label htmlFor="file-input">
             <svg className='input-icon disabled' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                 <title>paperclip</title>
                 <path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" />
             </svg>
             <input accept='video/mp4' type="file" id="file-input" className='hidden-file-input'/>
         </label>
        )
}


    <input type="text" placeholder="Describe Your Video" className='prompt-input-text' value={promptValue} onChange={(e) => setPromptValue(e.target.value)} disabled={importedVideo !== '' || finalPrompt !== ''}/>
   {importedVideo !== '' ? 
    <svg 
        onClick={() => {
            if (finalPrompt === '' && transcriptionProcess !== 'loading') {
                setImportedVideo(''); 
                setPromptValue('');  
                document.getElementById('file-input').value = '';
            }
        }} 
        className={`remove-video ${finalPrompt !== '' || transcriptionProcess === 'loading' ? 'disabled' : ''}`}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
    >
        <title>close-circle</title>
        <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </svg> 
: null}
</div>

                        
                        {!againBtn ? 
                            <button type="submit" className={generateBtnClass} onClick={(e) => generateBtn(e)}>
                                {priceCounter} 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <title>star-four-points</title>
                                    <path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" />
                                </svg>
                                {generateBtnClass === 'prompt-input-button too-much' && 
                                    <div className="popup">
                                        <button className='buy-credits' onClick={() => setBuyCreditsState(true)}>
                                            Buy 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <title>star-four-points</title>
                                                <path d="M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z" />
                                            </svg>
                                        </button>
                                    </div>
                                }
                            </button> 
                            : 
                            <button type='submit' className='again-btn' onClick={(e) => {e.preventDefault(); setAgainReminder(true)}} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <title>cached</title>
                                    <path d="M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12" />
                                </svg>
                            </button>
                        }

                        {againReminder && (thumbnailProcess === 'loading' || titleProcess === 'loading' || descriptionProcess === 'loading') ? (
                        <div className="again-reminder">
                            <div className="reminder-text">
                            <p>You can't restart while generating</p>
                            </div>
                            <div className="reminder-buttons">
                            <button className="reminder-btn cancle" onClick={(e) => {e.preventDefault(); setAgainReminder(!againReminder); console.log('Cancel button clicked')}}>Okay</button>
                            </div>
                        </div>
                        )
                        : againReminder ? (
                        <div className="again-reminder">
                            <div className="reminder-text">
                            <p>This action will remove delete everything. Are you sure?</p>
                            </div>
                            <div className="reminder-buttons">
                            <button className="reminder-btn cancle" onClick={() => {setAgainReminder(!againReminder); console.log('Cancel button clicked')}}>Cancel</button>
                            <button className="reminder-btn yes" onClick={(e) => againFunc(e)}>Yes</button>
                            </div>
                        </div>
                        ) : null
                        }


                    </form>

  <video style={{ display: 'none' }} ref={videoRef} src={importedVideo} />
        </div>
        </div>
    )
}