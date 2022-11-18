import React from 'react';
import { useState } from 'react';
import Input from './Input'
import Select from './Select'
import formStyles from './Form.module.css';
import environment from '../../environment/environment';

export default function PertForm({ handleSubmit, petData, btnText }) {

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
    handleSubmit(pet)
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
            text="Imagem"
            type="file"
            name="image"
            multiple={true}
            handleChange={onFileChange}
          />

          <Input 
            text="Nome"
            type="text"
            placeholder="Digite o nome"
            name="name"
            handleChange={handleChange}
            value={pet.name || ''}
          />

          <Input 
            text="Idade"
            type="number"
            placeholder="Digite a idade"
            name="age"
            handleChange={handleChange}
            value={pet.age || ''}
          />

          <Input 
            text="Peso"
            type="number"
            placeholder="Digite o peso"
            name="weight"
            handleChange={handleChange}
            value={pet.weight || ''}
          />

          <Select
            name="color"
            text="Seleciona a cor"
            value={pet.color || ''}
            options={colors}
            handleChange={handleColor}
          />

          <input type="submit" value="Cadastrar Pet" />
        </div>
      </form>
    </div>
  )
}