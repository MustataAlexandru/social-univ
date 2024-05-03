import {Button, Checkbox, Label, Modal} from "flowbite-react";
import {Card} from "flowbite-react";
import {FloatingLabel} from "flowbite-react";
import {useEffect, useRef, useState} from 'react';
import {Alert} from "flowbite-react";
import {useUser} from "./ContextProviders/UserProvider";
import {useNavigate} from "react-router-dom";
import {SelectTW} from "./DynamicComponents/SelectTW.jsx";


export default function Register() {
    const user = useUser();
    const navigate = useNavigate();
    const {login} = useUser();
    const [alertKind, setAlertKind] = useState('success');
    const [haveAnAccount, setHaveAnAccount] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState('hidden');
    const [alert, setAlert] = useState(null);
    const [regUserAn, setRegUserAn] = useState();
    const [regUserGrupa, setRegUserGrupa] = useState();
    const regUserProfile = useRef('');
    const regEmailRef = useRef('');
    const regUserNameRef = useRef('');
    const regNumeRef = useRef('');
    const regPrenumeRef = useRef('');
    const regPassRef = useRef('');
    const regRePassRef = useRef('');
    const loginUserRef = useRef('');
    const loginPassRef = useRef('');
    const [openModal, setOpenModal] = useState(false);
    const [checked, setChecked] = useState(false);


    const handleGrChange = newValue => {
        setRegUserGrupa(newValue)
    }
    const handleYearChange = (newValue) => {
        setRegUserAn(newValue);
    }

    const loginHandler = async e => {
        e.preventDefault();
        const username = loginUserRef.current.value;
        const password = loginPassRef.current.value;
        try {
            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data.user);
                login(data.user)
                setAlertKind('success');
                setAlert('Succesfully logged in!');
                navigate('/');

            } else {
                setAlertKind('failure');
                setAlert(data.message || 'Error logging in!');
                // throw new Error(data.message)}
            }
        } catch (error) {
            setAlert(error.message || 'Failed to login')
        } finally {
            toggleAlert();
        }
    }

    function containsNumber(str) {
        return /\d/.test(str);
    }

    const toggleAlert = () => {
        setIsAlertVisible('visible');
        setTimeout(() => {
            setIsAlertVisible('hidden');
        }, 12000);
    }

    function clearForm() {
        regEmailRef.current.value = '';
        regUserNameRef.current.value = '';
        regNumeRef.current.value = '';
        regPrenumeRef.current.value = '';
        regPassRef.current.value = '';
        regRePassRef.current.value = '';
        regUserProfile.current.value = '';
        setRegUserGrupa(null);
        setRegUserAn(null);
    }

    const registerHandler = (e) => {
        e.preventDefault();
        const password = regPassRef.current.value;
        const rePassword = regRePassRef.current.value;
        if (checked) {
            if (password === rePassword && password.length > 7 &&
                !containsNumber(regNumeRef.current.value) &&
                !containsNumber(regPrenumeRef.current.value)) {

                fetch('http://localhost:3001/users/new', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: regEmailRef.current.value.trim(),
                        username: regUserNameRef.current.value.trim(),
                        nume: regNumeRef.current.value.trim(),
                        prenume: regPrenumeRef.current.value.trim(),
                        password: password,
                        anStudiu: regUserAn,
                        profil: regUserProfile.current.value.trim(),
                        grupa: regUserGrupa
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 201) {
                            setAlert('Successfully registered!');
                            setAlertKind('success');
                            clearForm();
                        } else if (data.status === 409) {
                            setAlertKind('failure');
                            setAlert(data.message);
                        } else {
                            console.log(data.status)
                            clearForm();
                            setAlertKind('success');
                            setAlert(data.message || 'Registration failed due to an error');
                        }
                        toggleAlert();
                    })
                    .catch(error => {
                        // console.error('Error registering:', error);
                        setAlertKind('failure');
                        setAlert(`${error.message}`);
                        toggleAlert();
                    });
            } else {
                setAlertKind('failure');
                setAlert('Please check your inputs. Make sure passwords match and contain no numbers in names.');
                toggleAlert();
            }
        } else {
            setAlertKind('failure');
            setAlert('Te rog sa citesti termenii si conditiile!');
            toggleAlert();
        }
    };

    const toggleCheck = () => {

        setChecked(prev => !prev);
        console.log(checked);
    }

    const modalAcceptHandler = () => {
        setOpenModal(false);
        setChecked(true);
    }

    const toggleRegister = (e) => {
        e.preventDefault();
        setHaveAnAccount(!haveAnAccount);
    }
    useEffect(() => {
        if (user.token) navigate('/dashboard')
    }, []);


    return (
        <div className="flex dark:text-white mt-8">
            {/* MODAL BEGIN */}
            <Modal style={{zIndex: 200}} className='loading-f' show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header><h1 className='text-center'>Termeni și Condiții</h1></Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <h1 className='text-center'><strong>Introducere</strong></h1>
                            Această aplicație este destinată utilizării de către studenții universitari pentru a posta
                            anunțuri, a comenta, și a încărca teme. Prin crearea unui cont și utilizarea aplicației, vă
                            angajați să respectați următorii termeni și condiții.


                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <h1 className='text-center'><strong>Contul de Utilizator</strong></h1>
                            <ol>
                                <li><strong>Înregistrarea:</strong> Pentru a utiliza aplicația, trebuie să vă
                                    înregistrați
                                    folosind adresa de email universitară și să furnizați informații relevante cerute în
                                    formularul de înregistrare.
                                </li>
                                <li><strong>Conținut interzis:</strong> Nu este permisă postarea de conținut ilegal,
                                    ofensator, calomnios sau care încalcă drepturile de proprietate intelectuală ale
                                    altora.
                                </li>
                                <li>
                                    <strong>Drepturile asupra conținutului postat:</strong> Prin postarea conținutului,
                                    acordați aplicației o licență nelimitată de a folosi, distribui și afișa acest
                                    conținut
                                    în cadrul platformei.
                                </li>
                            </ol>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <h1 className='text-center'><strong>Conținut</strong></h1>
                            <ol>
                                <li><strong>Proprietatea conținutului:</strong> Utilizatorii păstrează drepturile de
                                    autor
                                    asupra conținutului pe care îl postează pe platformă.
                                </li>
                                <li><strong>Securitatea contului:</strong> Este responsabilitatea dumneavoastră să
                                    mențineți
                                    confidențialitatea parolei și să asigurați securitatea contului dumneavoastră.
                                </li>
                                <li>
                                    <strong>Responsabilitatea activităților contului:</strong> Sunteți responsabil(ă)
                                    pentru
                                    toate activitățile care se desfășoară sub contul dumneavoastră.
                                </li>
                            </ol>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <h1 className='text-center'><strong>Interacțiunea Utilizatorilor</strong></h1>
                            <ol>
                                <li><strong>Comportamentul utilizatorilor:</strong> Este necesar să mențineți un
                                    comportament civilizat și respectuos în toate interacțiunile.
                                </li>
                                <li><strong>Raportarea abuzurilor:</strong> Utilizatorii pot raporta comportamente
                                    abuzive
                                    sau conținut inadecvat administrației aplicației.
                                </li>

                            </ol>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <h1 className='text-center'><strong>Modificări ale Termenilor și Condițiilor</strong></h1>
                            <ol>
                                <li><strong>Dreptul de a modifica termenii:</strong> Este necesar să mențineți un
                                    comportament civilizat și respectuos în toate interacțiunile.
                                </li>


                            </ol>
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{margin: '0 auto'}}>
                    <Button gradientDuoTone="pinkToOrange" style={{width: '10rem'}}
                            onClick={() => modalAcceptHandler()}>I accept</Button>
                    <Button style={{width: '10rem'}} color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* MODAL END */}
            <Alert color={alertKind} className={`${isAlertVisible} ${alertKind} absolute-alert`}
                   onDismiss={() => setIsAlertVisible('hidden')}>
                {alert}
            </Alert>
            {/* <Toast className={`abs-t-r ${isAlertVisible}`}>
      <strong className={`${alertKind}`}>{alert}</strong>
      <Toast.Toggle />
      </Toast> */}
            {!haveAnAccount ? (<Card className="max-w-lg centered loading-f">

                <h1 className="text-center">Inregistreaza-te</h1>
                <form className="max-w-lg flex-col" onSubmit={registerHandler}>
                    <div className='flex flex-col gap-2'>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="email" label="Email" variant="outlined" ref={regEmailRef} required shadow/>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="text" label="Username" variant="outlined" ref={regUserNameRef} required shadow/>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="text" label="Nume" variant="outlined" ref={regNumeRef} required shadow/>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="text" label="Prenume" variant="outlined" ref={regPrenumeRef} required shadow/>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="text" label="Profil(Informatica , Geografie etc)" variant="outlined"
                            ref={regUserProfile} required shadow/>

                        <SelectTW title={'An de studiu'}
                                  data={[{cat_id: 1, cat_title: '1'}, {cat_id: 2, cat_title: '2'}, {
                                      cat_id: 3,
                                      cat_title: '3'
                                  }, {cat_id: 4, cat_title: '4 (master)'}, {cat_id: 5, cat_title: '5 (master)'}]}
                                  value={regUserAn} onChange={handleYearChange}/>
                        <SelectTW title={'Grupa'} data={[{cat_id: 1, cat_title: '1'}, {cat_id: 2, cat_title: '2'}, {
                            cat_id: 3,
                            cat_title: '3'
                        }, {cat_id: 4, cat_title: '4'}]} value={regUserGrupa} onChange={handleGrChange}/>

                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="password" label="Parola" variant="outlined" ref={regPassRef} required shadow/>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="password" label="Repeta Parola" variant="outlined" ref={regRePassRef} required
                            shadow/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className="flex items-center">
                            <Checkbox id="agree" checked={checked} onClick={() => toggleCheck()}
                                      className="focus:ring-orange-500 dark:bg-gray-700 dark:focus:ring-orange-500 mr-2"/>
                            <Label htmlFor="agree" className="flex">
                                Sunt de accord cu&nbsp;
                                <a href="#" onClick={() => setOpenModal(true)}
                                   className="text-orange-600 hover:underline dark:text-orange-500">
                                    termenii si conditiile
                                </a>
                            </Label>
                        </div>
                        <Button style={{width: '100%'}} gradientDuoTone="pinkToOrange" type="submit">Inregistreaza
                            contul</Button>

                    </div>
                </form>
                <div className="flex gap-2 color-gray" style={{margin: '0 auto'}}>
                    Ai deja cont?
                    <button style={{color: 'rgb(255 90 31)'}} onClick={toggleRegister}>Mergi la login
                    </button>
                </div>
            </Card>) : (
                <Card key={2} className="max-w-sm centered loading-f">
                    <h1 className="text-center">Login</h1>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={loginHandler}>

                        <FloatingLabel s
                                       className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                                       type="text" label="Username" variant="outlined" ref={loginUserRef} required
                                       shadow/>
                        <FloatingLabel
                            className="peer-focus:text-orange-500 peer-focus:dark:text-orange-500 dark:bg-gray-800 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-600 dark:focus:border-orange-400"
                            type="password" label="Parola" variant="outlined" ref={loginPassRef} required shadow/>
                        <Button gradientDuoTone="pinkToOrange" type="submit">Login</Button>


                    </form>
                    <div className="flex gap-2 color-gray" style={{padding: '10px', margin: '0 auto'}}>
                        Nu ai cont?
                        <button type="submit" onClick={toggleRegister}> Inregistreaza-te aici
                        </button>
                    </div>
                </Card>
            )}
        </div>
    );
}
