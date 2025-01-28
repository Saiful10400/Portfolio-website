import { useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";

const ProjectBackend = () => {
  const axiosPublic = useAxiosPublic();
  const inputStyle =
    "text-xl  font-medium w-full px-2 py-1 rounded-lg focus:outline-none";
  const textStyle = "w-full rounded-lg text-lg focus:outline-none";
  const preimage =
    "https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png";

  // image hadle states.
  const [thambnail, setThambnail] = useState(null);
  const [cover, setCover] = useState(null);
  // on change image handle.
  const thambnailHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const live = e.target.result;
      setThambnail({ file, live });
    };
    reader.readAsDataURL(file);
  };
  const coverHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const live = e.target.result;
      setCover({ file, live });
    };
    reader.readAsDataURL(file);
  };
  // onsubmit form handel.
  const formHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const ProjectName = form.name.value;
    const title = form.title.value;
    const about = form.about.value;
    const technology = form.technology.value;
    const summery = form.summery.value;
    const duration = form.duration.value;
    const liveLink = form.liveLink.value;
    const repoLink = form.repoLink.value;
    const startingDate = form.startingDate.value;
    if (thambnail && cover) {
      const thumbnailfile = new FormData();
      thumbnailfile.append("image", thambnail?.file);
      fetch(
        `https://api.imgbb.com/1/upload?key=c6442085caab8a5f1fb64b323abb5041`,
        {
          method: "POST",
          body: thumbnailfile,
        }
      )
        .then((first) => first.json())
        .then((res) => {
          const thambnailUrl = res.data.url;
        
          //   posting cover.
          const coverfile = new FormData();
          coverfile.append("image", cover?.file);
          fetch(
            `https://api.imgbb.com/1/upload?key=c6442085caab8a5f1fb64b323abb5041`,
            {
              method: "POST",
              body: coverfile,
            }
          ).then((first) => first.json())
          .then(res=>{
            const coverUrl=res.data.url
            
            // posting project data into mongo db. database.
            axiosPublic.post("/post_projects",{ProjectName,title,about,technology,liveLink,repoLink,summery,duration,startingDate,thambnailUrl,coverUrl})
            .then(res=>alert(res.data))

          })
        });
    }
  };
  return (
    <div>
      <form onSubmit={formHandle} className="w-[300px] flex flex-col gap-2">
        <label className="relative" htmlFor="thambnail">
          <img
            className="w-full h-[200px] object-contain"
            src={thambnail?.live || preimage}
            alt=""
          />
          <div className="absolute bg-white text-black top-0 left-4">
            Thambnail.
          </div>
          <input
            className="hidden"
            id="thambnail"
            onInput={thambnailHandle}
            type="file"
            accept="image/png , image/jpeg"
            name="image"
          />
        </label>
        <label className="relative" htmlFor="coverimg">
          <img
            className="w-full h-[200px] object-contain"
            src={cover?.live || preimage}
            alt=""
          />
          <div className="absolute bg-white text-black top-0 left-4">
            Cover image gif
          </div>
          <input
            className="hidden"
            id="coverimg"
            onInput={coverHandle}
            type="file"
            accept="image/png , image/jpeg , image/gif"
            name="image"
          />
        </label>
        <input
          required
          name="name"
          className={inputStyle}
          type="text"
          placeholder="Project naem.(short name)"
        />
        <textarea
          required
          name="title"
          className={textStyle}
          placeholder="Project title.(it conuld be a sentence.)"
        ></textarea>
        <textarea
          required
          name="about"
          className={textStyle}
          placeholder="Project about.(it couldbe aparagraph."
        ></textarea>
        <textarea
          required
          name="technology"
          className={textStyle}
          placeholder="Which technology you use.(it could be paragraph.)"
        ></textarea>
        <textarea
          required
          name="summery"
          className={textStyle}
          placeholder="write summery of this project."
        ></textarea>
        <input
          name="duration"
          type="number"
          className={inputStyle}
          placeholder="How long this project takes? (duration.)"
        />
        <input
          name="startingDate"
          type="date"
          placeholder="When you start your project?"
          className={inputStyle}
        />
        <input name="liveLink" required type="text" className={inputStyle} placeholder="LIve link URL" />
        <input name="repoLink" required type="text" className={inputStyle} placeholder="Github repo link" />
        <button type="submit" className="btn btn-primary btn-md">Post</button>
      </form>
    </div>
  );
};

export default ProjectBackend;
