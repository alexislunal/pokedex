import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./charts.js";

const $image = document.querySelector('#image');
export function setImage(image) {
  $image.src = image;
}

const $description = document.querySelector('#description');
function setDescription(text) {
  $description.textContent = text;
}

const $screen = document.querySelector('#screen');
function loader(isLoading = false) {
  const img = isLoading ? 'url(./images/loading.gif)': '';
  $image.style.display = isLoading ? 'none': 'block';
  $description.textContent = isLoading ? 'Buscando pokémon...': '';
  $screen.style.backgroundImage = img;
}

const $light = document.querySelector('#light');
function speech(text) {
  speechSynthesis.cancel();
  const utterance =  new SpeechSynthesisUtterance(text);
  utterance.lang = 'es';
  speechSynthesis.speak(utterance);
  $light.classList.add('is-animated');
  utterance.addEventListener('end', () => {
    $light.classList.remove('is-animated');
  })
}

export async function findPokemon(id) {
  const pokemon = await getPokemon(id);
  const species = await getSpecies(id);
  console.log(pokemon);
  console.log(species);
  const stats = {
    labels: pokemon.stats.map(item => item.stat.name),
    values: pokemon.stats.map(item => item.base_stat)
  }
  const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es');
  const sprites = [pokemon.sprites.front_default];
  for (const item in pokemon.sprites) {
    if (item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]) {
      sprites.push(pokemon.sprites[item]);
    }
  }
  return {
    sprites,
    description: description.flavor_text,
    id: pokemon.id,
    name: pokemon.name.toUpperCase(),
    stats
  }
}

let activeChart = null;
export async function setPokemon(id) {
  //Prender loader
  loader(true);
  const pokemon = await findPokemon(id);
  loader(false);
  //Apagar loader
  setImage(pokemon.sprites[0]);
  setDescription(pokemon.description);
  speech(`${pokemon.name}. ${pokemon.description}`);
  if (activeChart instanceof Chart) activeChart.destroy();
  activeChart = createChart(pokemon);
  return pokemon;
}