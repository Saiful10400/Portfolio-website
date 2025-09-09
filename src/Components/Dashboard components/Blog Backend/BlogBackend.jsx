 
import { useState } from 'react';
import useAxiosPublic from '../../../customHoocks/useAxiosPublic';

const BlogBackend = () => {
    const inputStyle="text-xl  font-medium w-full px-2 py-1 rounded-lg focus:outline-none"
    const textStyle="w-full rounded-lg text-lg focus:outline-none"
    const preimage ="https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png"

    const[cover,setCover]=useState(null)
    const[liveImage,setLiveImage]=useState(null)
    const axiosPublic=useAxiosPublic()
    
    // form handle.
    const formHandle=(e)=>{
        e.preventDefault()
        if(cover){
            const form=e.target
            const title=form.title.value
            const subTitle=form.subTitle.value
            const content=form.content.value
            
            // uploading imge on imgbb.
            const imge=new FormData()
            imge.append("image",cover)
            fetch(`https://api.imgbb.com/1/upload?key=c6442085caab8a5f1fb64b323abb5041`,{
                method:"POST",
                body:imge
            })
            .then(result=>result.json())
            .then(res=>{
                if(res.data.url){
                    const coverImage=res.data.url
                    let postDate=new Date()
                    postDate=postDate+""
                   axiosPublic.post("/post_blog",{title,subTitle,content,coverImage,postDate})
                   
                }
            })
            
        }
        else{
            alert("your are not selected cover image.")
        }
    }
    // image handle for visualization.
    const imageHandle=e=>{
        setCover(e.target.files[0])
        const file=e.target.files[0]
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=e=>{
            setLiveImage(e.target.result)
        }
    }
   
    return (
        <div>
           <form onSubmit={formHandle} className='w-[300px] flex flex-col gap-2'>
            <label htmlFor="image">
            <img className='w-full h-[200px] object-contain' src={liveImage || preimage} alt="" />
            <input className='hidden' id='image' onChange={imageHandle} type="file" accept='image/png , image/jpeg' name='image' />
            </label>
            <input  required name='title' className={inputStyle} type="text" placeholder='Blog title is here.' />
            <textarea required name='subTitle' className={textStyle} placeholder='Sub title is here.'></textarea>
            <textarea required name='content' className={textStyle} placeholder='Content is here.'></textarea>
            <button className='btn btn-primary btn-md'>Post</button>
           </form>
        </div>
    );
};

export default BlogBackend;


// what to add.
// 1.date
// 2.author
// 3.title
// 4.subtitle
// 5.content