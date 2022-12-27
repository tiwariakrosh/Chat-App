import React, { useEffect, useState } from 'react'
import { ChatEngine } from "react-chat-engine";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "6210c226-1eb2-4b51-aa40-696a7169fc7c",
                "user-name": user.email,
                "user-secret": user.uid,
                "private-key": "7d149705-d2ca-4552-afc1-af3e74502ae0"
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);

                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            {
                                headers: { "private-key": "7d149705-d2ca-4552-afc1-af3e74502ae0" }
                            }
                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history]);

    // if (!user || loading) return 'Loading...';

    return (
        <div className='chats-page'>
            <div className="nav-bar">
                <div className="logo-tab">
                    Chat App
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="6210c226-1eb2-4b51-aa40-696a7169fc7c"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats