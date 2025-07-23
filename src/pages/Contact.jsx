export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-8 text-center max-w-xl">
        Have questions, feedback, or want to get in touch? Fill out the form below or email us at <a href="mailto:info@glidex.com" className="text-[#2DFF28] underline">info@glidex.com</a> and our team will get back to you as soon as possible.
      </p>
      <form className="w-full max-w-md space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border rounded px-4 py-2" />
        <input type="email" placeholder="Your Email" className="w-full border rounded px-4 py-2" />
        <textarea placeholder="Your Message" className="w-full border rounded px-4 py-2 min-h-[100px]"></textarea>
        <button type="submit" className="bg-[#2DFF28] text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-[#24cc20] transition-colors duration-200">Send Message</button>
      </form>
    </div>
  );
}
