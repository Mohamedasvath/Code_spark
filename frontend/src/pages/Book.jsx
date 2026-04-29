import { useState } from "react";
import api from "../api/axios";

export default function ServicesSection() {

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
projectType:"",
budget:"",
message:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{
e.preventDefault();

try{

await api.post("/api/contacts",form);

alert("Message sent successfully");

setForm({
name:"",
email:"",
phone:"",
projectType:"",
budget:"",
message:""
});

}catch(err){
alert("Failed to send message");
}

};

return (

<section className="py-24 bg-[#050816] text-white">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-16">
Our Services
</h2>

<div className="grid md:grid-cols-2 gap-8 mb-20">

<div className="bg-[#0b0f2a] p-6 rounded-lg">
<h3 className="text-xl font-semibold mb-3">
Website Development
</h3>
<p className="text-gray-400">
Custom modern websites built using React and MERN stack.
</p>
</div>

<div className="bg-[#0b0f2a] p-6 rounded-lg">
<h3 className="text-xl font-semibold mb-3">
Admin Dashboard
</h3>
<p className="text-gray-400">
Powerful admin panels with analytics and management tools.
</p>
</div>

<div className="bg-[#0b0f2a] p-6 rounded-lg">
<h3 className="text-xl font-semibold mb-3">
UI / UX Design
</h3>
<p className="text-gray-400">
Modern and user friendly interface design.
</p>
</div>

<div className="bg-[#0b0f2a] p-6 rounded-lg">
<h3 className="text-xl font-semibold mb-3">
Website Optimization
</h3>
<p className="text-gray-400">
Speed optimization and SEO improvements.
</p>
</div>

</div>

{/* CONTACT FORM */}

<div className="max-w-xl mx-auto">

<h3 className="text-3xl font-bold mb-8 text-center">
Start Your Project
</h3>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
className="w-full p-3 rounded bg-[#0b0f2a]"
required
/>

<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
className="w-full p-3 rounded bg-[#0b0f2a]"
required
/>

<input
name="phone"
placeholder="Phone"
value={form.phone}
onChange={handleChange}
className="w-full p-3 rounded bg-[#0b0f2a]"
/>

<input
name="projectType"
placeholder="Project Type"
value={form.projectType}
onChange={handleChange}
className="w-full p-3 rounded bg-[#0b0f2a]"
/>

<input
name="budget"
placeholder="Budget"
value={form.budget}
onChange={handleChange}
className="w-full p-3 rounded bg-[#0b0f2a]"
/>

<textarea
name="message"
placeholder="Message"
value={form.message}
onChange={handleChange}
className="w-full p-3 rounded bg-[#0b0f2a]"
/>

<button
className="w-full bg-blue-500 p-3 rounded hover:bg-blue-600"
>
Send Project Request
</button>

</form>

</div>

</div>

</section>

);

}