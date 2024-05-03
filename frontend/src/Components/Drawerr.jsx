import { Drawer, Sidebar, TextInput} from "flowbite-react";
import {Link} from "react-router-dom";
import Dashboard from './Dashboard.jsx'
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiLogin,
    HiPencil,
    HiSearch,
    HiShoppingBag,
    HiUsers,

} from "react-icons/hi";


export default function Drawerr({show, setShow}) {


    // console.log(user);

    return (
        <>
            <Drawer open={show} onClose={() => setShow(false)}>
                <Drawer.Header title="MENU" titleIcon={() => <></>}/>
                <Drawer.Items>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                <form className="pb-3 md:hidden">
                                    <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32}/>
                                </form>
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item icon={HiChartPie}>
                                            <Link to={`/profil`} element={<Dashboard/>}>Profil</Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/e-commerce/products" icon={HiShoppingBag}>
                                            Teme
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/users/list" icon={HiUsers}>
                                            Utilizatori
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                                            {'Informatica'}
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                                            Jocuri
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item href="https://github.com/themesberg/flowbite-react/"
                                                      icon={HiClipboard}>
                                            Docs
                                        </Sidebar.Item>
                                        <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                                            Components
                                        </Sidebar.Item>
                                        <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues"
                                                      icon={HiInformationCircle}>
                                            Ajutor
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    );
}
