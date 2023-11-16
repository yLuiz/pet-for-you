import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import environment from '../../environment/environment';
import formStyles from './Form.module.css';
import Input from './Input';
import Select from './Select';
import { toast } from 'react-toastify';

export default function PertForm({ handleSubmit, petData, btnText, loading }) {

  const [pet, setPet] = useState(petData || {});

  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {
    setPet({...pet, images: [...e.target.files]});
    setPreview([...e.target.files]);
  }
  
  function handleChange(e) {
    setPet({...pet, [e.target.name]: e.target.value});
  }

  function handleColor(e) {
    setPet({...pet, color: e.target.options[e.target.selectedIndex].text});
  }

  function submit(event) {
    event.preventDefault();
    if (!pet.color) {
      toast("Imagem é obrigatória!", {
        type: 'error'
      });
      return;
    }
    handleSubmit(pet);
  }

  return (
    <div
      className={formStyles.form_container}
    >
      <form
        onSubmit={submit}
      >
        <div className={formStyles.form_inputs}>

          <div className={formStyles.preview_pet_images}>
            { preview.length ?
              preview.map((image, index) => (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt={pet.name} 
                  key={`${pet.name}${index}`} 
                />
              )) : pet.images ? 
              pet.images.map((image, index) => (
                <img 
                  src={`${environment.REACT_APP_API}/images/pets/${image}`} 
                  alt={pet.name} 
                  key={`${pet.name}${index}`}
                />
              )) : null
            }
          </div>

          <Input
            required={true} 
            text="Imagem"
            type="file"
            name="image"
            multiple={true}
            handleChange={onFileChange}
          />

          <Input
            required={true} 
            text="Nome"
            type="text"
            placeholder="Digite o nome"
            name="name"
            handleChange={handleChange}
            value={pet.name || ''}
          />

          <Input
            required={true} 
            text="Idade"
            type="number"
            placeholder="Digite a idade"
            name="age"
            handleChange={handleChange}
            value={pet.age || ''}
          />

          <Input
            required={true} 
            text="Peso"
            type="number"
            placeholder="Digite o peso"
            name="weight"
            handleChange={handleChange}
            value={pet.weight || ''}
          />

          <Select
            required={true}
            name="color"
            text="Seleciona a cor"
            value={pet.color || ''}
            options={colors}
            handleChange={handleColor}
          />

          <button disabled={ loading } type='submit'>{ loading ? <span className={formStyles.loader}></span> : "Cadastrar pet" }</button>
          <Link className={formStyles.backButton} to="/pet/mypets">Voltar</Link>
        </div>
      </form>
    </div>
  )
}