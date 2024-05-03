import {Footer} from "flowbite-react";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs";
import {Button} from "flowbite-react";

export default function Foter() {
    return (
        <Footer container style={{borderTop: '1px solid rgb(55 65 81 )'}}>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                    </div>
                    <div className="w-full sm:flex sm:items-center sm:justify-center gap-8">
                        <Footer.Copyright href="#" by="Mustata Alexandru-Cristian" year={2024}/>
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="#" icon={BsFacebook}/>
                            <Footer.Icon href="#" icon={BsInstagram}/>
                            <Footer.Icon href="#" icon={BsTwitter}/>
                            <Footer.Icon href="#" icon={BsGithub}/>
                            <Footer.Icon href="#" icon={BsDribbble}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="Resources"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Flowbite</Footer.Link>
                                <Footer.Link href="#">Tailwind</Footer.Link>
                                <Footer.Link href="#">Express.js</Footer.Link>
                                <Footer.Link href="#">React.js</Footer.Link>
                                <Footer.Link href="#">MariaDB</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Github</Footer.Link>
                                <Footer.Link href="#">Discord</Footer.Link>
                                <Footer.Link href="#">Instagram</Footer.Link>
                                <Footer.Link href="#">Facebook</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Privacy Policy</Footer.Link>
                                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>

            </div>
        </Footer>
    );
}
