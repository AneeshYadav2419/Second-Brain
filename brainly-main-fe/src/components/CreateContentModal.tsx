// // //controlled components
// // import { Input } from "postcss"
// import { Input } from "./Input";
// import { Button } from "./Button";
// import { CrossIcon } from "./CrossIcon";
// import { useRef, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

// enum ContentType {
//   Youtube = "youtube",
//   Twitter = "twitter",
//   Linkedin = "linkedin"
// }

// export function CreateContentModal({ open, onClose }) {
//   const titleRef = useRef<HTMLInputElement>();
//   const linkRef = useRef<HTMLInputElement>();
//   const [type, setType] = useState(ContentType.Youtube);

//   async function addContent() {
//     const title = titleRef.current.value;
//     const link = linkRef.current.value;

//     await axios.post(
//       `${BACKEND_URL}/api/v1/content`,
//       {
//         link,
//         title,
//         type,
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     );
//     onClose();
//   }

//   return (
//     <div>
//       {open && (
//         <>
//           {/* Overlay */}
//           <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-40" />

//           {/* Modal */}
//           <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
//               {/* Close Button */}
//               <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
//                 <CrossIcon />
//               </div>

//               {/* Inputs */}
//               <div className="flex flex-col gap-4 mt-4">
//                 <Input  reference={titleRef} placeholder={"Title"} />
//                 <Input reference={linkRef} placeholder={"Link"} />
//               </div>

//               {/* Type Selection */}
//               <div className="mt-6">
//                 <h2 className="text-lg font-semibold mb-2 text-center">Select Type</h2>
//                 <div className="flex justify-center gap-3">
//                   <Button
//                     text="Youtube"
//                     variant={type === ContentType.Youtube ? "primary" : "secondary"}
//                     onClick={() => setType(ContentType.Youtube)}
//                   />
//                   <Button
//                     text="Twitter"
//                     variant={type === ContentType.Twitter ? "primary" : "secondary"}
//                     onClick={() => setType(ContentType.Twitter)}
//                   />

//                    <Button
//                     text="Linkedin"
//                     variant={type === ContentType.Linkedin ? "primary" : "secondary"}
//                     onClick={() => setType(ContentType.Linkedin)}
//                   />
//                 </div>
//               </div>

//               {/* Submit */}
//               <div className="mt-6 flex justify-center">
//                 <Button onClick={addContent} variant="primary" text="Submit" />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// //controlled components
import { Input } from "./Input";
import { Button } from "./Button";
import { CrossIcon } from "./CrossIcon";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Linkedin = "linkedin"
}

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Make the browser run native validation for required fields
    if (!e.currentTarget.reportValidity()) return;

    const title = titleRef.current!.value.trim();
    const link  = linkRef.current!.value.trim();

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type }, // <-- type included
        { headers: { Authorization: localStorage.getItem("token") ?? "" } }
      );
      onClose();
    } catch (err) {
      console.error(err);
      // add your toast/alert here if you want
    }
  }

  return (
    <div>
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-40" />

          {/* Modal */}
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
              {/* Close Button */}
              <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
                <CrossIcon />
              </div>

              <form onSubmit={onSubmit}>
                {/* Inputs */}
                <div className="flex flex-col gap-4 mt-4">
                  <Input reference={titleRef} placeholder="Title" required />
                  <Input reference={linkRef}  placeholder="Link"  required />
                </div>

                {/* Type Selection */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2 text-center">Select Type</h2>
                  <div className="flex justify-center gap-3">
                    <Button
                      text="Youtube"
                      variant={type === ContentType.Youtube ? "primary" : "secondary"}
                      onClick={(e) => { e.preventDefault(); setType(ContentType.Youtube); }}
                    />
                    <Button
                      text="Twitter"
                      variant={type === ContentType.Twitter ? "primary" : "secondary"}
                      onClick={(e) => { e.preventDefault(); setType(ContentType.Twitter); }}
                    />
                    <Button
                      text="Linkedin"
                      variant={type === ContentType.Linkedin ? "primary" : "secondary"}
                      onClick={(e) => { e.preventDefault(); setType(ContentType.Linkedin); }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-6 flex justify-center">
                  {/* Ensure your Button forwards `type="submit"` to an underlying <button> */}
                  <Button type="submit" variant="primary" text="Submit" />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
