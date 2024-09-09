// import { CaretLineLeft, CaretLineRight, SignOut } from "@phosphor-icons/react"
// import { createContext, useContext, useState } from "react"

// const SideBarContext = createContext()
// function Sidebar({ children }: any) {
//   const [expanded, setExpanded] = useState(true);
//   return (
//     <aside className="h-screen">
//       <nav className="h-full flex flex-col bg-white border-r shadow-sm">
//         <div className="p-4 pb-4 flex justify-between items-center">
//           <span>REUSE</span>
//           <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100">
//             {expanded ? <CaretLineLeft size={32} /> : <CaretLineRight size={32} />}
//           </button>
//         </div>

//         <SideBarContext.Provider value={{ expanded }}>
//           <ul className="flex-1 px-3">{children}</ul>
//         </SideBarContext.Provider>

//         <div className="border-t flex p-3">
//           <img src="" alt="" />
//         </div>
//         <div className={`
//             flex justify-between items-center
//             overflow-hidden transition-all
//             ${expanded ? "w-52 ml-3" : "w-0"}
//           `}>
//           <div className="leading-4">
//             <h4>John Doe</h4>
//             <span>johndoe@gmail.com</span>
//             <SignOut size={32} />
//           </div>
//         </div>
//       </nav>
//     </aside >
//   )
// }

// export function SidebarItem({ icon, text, active, alert }: any) {
//   const { expanded } = useContext(SideBarContext)
//   return (
//     <li className={`
//       relative flex items-center py-2 px-3
//       font-medium rounded-md cursor-pointer
//       transition-colors
//       ${active
//         ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//         : "hover:bg-indigo-50 text-gray-600"
//       }
//     `}>
//       {icon}
//       <span className={`
//         overflow-hidden transition-all
//         ${expanded ? "w-52 ml-3" : "w-0"}
//         `}>
//         {text}
//       </span>
//       {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2" }`}>

//       </div>}
//     </li>
//   )
// }

// export default Sidebar