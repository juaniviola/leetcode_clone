import axios from 'axios';
import config from '../config.js';

const { problemApi } = config;

export default async function getEvaluator(id, language, mode /* run | submit */) {
  return axios.get(`${problemApi}/evaluator/${id}/${language}/${mode}`);
}
