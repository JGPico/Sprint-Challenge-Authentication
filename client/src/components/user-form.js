import React from 'react';
import useForm from 'react-hook-form';

function UserForm () {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = () => {
        console.log(data);
    }
    return(
        <div>
            <form onSubmite={handleSubmit(onSubmit)}>
                <input type='text' placeholder='username' name='username' ref={register}/>
                <input type='text' placeholder='password' name='password' ref={register}/>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default UserForm;