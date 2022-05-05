import QuestionnaireWrapper from 'components/QuestionnaireWrapper';
import People from 'assets/images/People.png';
import React, { useContext } from 'react';
import QuestionnaireContext from 'state/questionnaire-context';
import Input from 'components/Input.jsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Identification = () => {
  const { answers, addAnswer } = useContext(QuestionnaireContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: answers.firstName,
      lastName: answers.lastName,
      email: answers.email,
    },
    shouldUnregister: true,
  });

  const emailBelongsToRedberry = (email) => {
    return email.trim().slice(-12) === '@redberry.ge';
  };

  return (
    <QuestionnaireWrapper image={People} form={'identification-form'}>
      <form
        action='/new_url'
        method='POST'
        id='identification-form'
        onSubmit={handleSubmit((data) => {
          addAnswer('firstName', data.firstName);
          addAnswer('lastName', data.lastName);
          addAnswer('email', data.email);
          localStorage.setItem('progress', 1);
          navigate('/questionnaire/2');
        })}
        className=' space-y-4'
      >
        <Input
          id='firstName'
          label='სახელი*'
          name='firstName'
          register={register}
          errors={errors}
          type='text'
          required={1}
          minLength={2}
        />
        <Input
          id='lastName'
          label='გვარი*'
          name='lastName'
          register={register}
          errors={errors}
          type='text'
          required={1}
          minLength={2}
        />
        <Input
          id='email'
          label='მეილი*'
          name='email'
          register={register}
          errors={errors}
          type='text'
          required={1}
          customValidation={{
            func: emailBelongsToRedberry,
            message:
              'გთხოვთ მიუთითეთ Redberry-ის მეილი (yourname.@redberry.ge)',
          }}
        />
      </form>
      <div className=' mt-40 w-4/6 xl:w-1/2'>
        <div className='w-full bg-dark-brown h-[1px] mb-5'></div>
        <p>*-ით მონიშნული ველების შევსება სავალდებულოა</p>
      </div>
    </QuestionnaireWrapper>
  );
};

export default Identification;
