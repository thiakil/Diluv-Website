import React, {useState} from "react";
import Drop from "../components/Drop"

function Footer() {

  return (<footer className={"pt-4 py-md-5 md:pt-5 border-t border-white-600"}>
    <div className={"md:flex flex-wrap justify-center"}>
      <div className="md:w-1/6 ml-auto">
        <Drop className={"mx-auto md:mx-0"} height={"54px"} width={"27px"}/>
        <small className="mb-3 text-gray-600 mx-auto md:mx-0">© 2019</small>
      </div>
      <div className="md:w-1/6">
        <h5 className={"text-lg font-bold pb-2"}>Product</h5>
        <ul className="list-none">
          <li><a href="/news" className={"hover:text-white"}>News</a></li>
          {
            false && (
              <li><a href="https://ideas.diluv.com" className={"hover:text-white"}>Feedback</a></li>
            )
          }
          {
            false && (
              <li><a href="https://blog.diluv.com" className={"hover:text-white"}>Blog</a></li>
            )
          }
          {
            false && (
              <li><a href="https://developer.diluv.com" className={"hover:text-white"}>Developers</a></li>
            )
          }
          <li><a href="https://github.com/Diluv" className={"hover:text-white"}>Github</a></li>
        </ul>
      </div>
      <div className="md:w-1/6">
        <h5 className={"text-lg font-bold pb-2"}>About</h5>
        <ul className="list-none">
          <li><a href="/about" className={"hover:text-white"}>About</a></li>
          <li><a href="/privacy" className={"hover:text-white"}>Privacy</a></li>
          <li><a href="/terms" className={"hover:text-white"}>Terms</a></li>
        </ul>
      </div>
      <div className="md:w-1/6 mr-auto">
        <h5 className={"text-lg font-bold  pb-2"}>Contact</h5>
        <ul className="list-none">
          <li><a href="https://twitter.com/DiluvSupport" className={"hover:text-white"}>Twitter</a></li>
          <li><a href="https://www.reddit.com/r/diluv/" className={"hover:text-white"}>Reddit</a></li>
          {
            false && (
              <li><a href="#">Discord</a></li>
            )
          }
        </ul>
      </div>
    </div>
  </footer>);
}

export default Footer;