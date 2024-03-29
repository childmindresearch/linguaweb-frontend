const API_ROUTE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export type TaskName = 'antonyms' | 'description' | 'jeopardy' | 'sound' | 'synonyms';
export type WritingTaskName = 'synonyms' | 'antonyms' | 'description' | 'jeopardy';
export const taskNames: TaskName[] = ['synonyms', 'antonyms', 'description', 'jeopardy', 'sound'];

export interface Word {
	id: number;
	word: string;
	description: string;
	synonyms: string[];
	antonyms: string[];
	jeopardy: string;
	s3_key: string;
}

export interface WordCheckRequest {
	word: string;
}

export const getWordIds = async (language: string, age: number): Promise<number[]> => {
	const response = await fetch(`${API_ROUTE}/words?language=${language}&age=${age}`);
	return response.json();
};

export const getWord = async (id: number): Promise<Word> => {
	const response = await fetch(`${API_ROUTE}/words/${id}`);
	return response.json();
};

export const getWordAudio = async (id: number): Promise<Blob> => {
	const response = await fetch(`${API_ROUTE}/words/download/${id}`);
	return response.blob();
};

export const getSpeechTranscript = async (audio: Blob, language: string): Promise<string> => {
	const formData = new FormData();
	formData.append('audio', audio);
	formData.append('language', language);

	const response = await fetch(`${API_ROUTE}/speech/transcribe`, {
		method: 'POST',
		body: formData
	});
	return response.json();
};

export const postCheckWord = async (wordId: number, word: string): Promise<boolean> => {
	const formData = new FormData();
	formData.append('word', word);

	const response = await fetch(`${API_ROUTE}/words/check/${wordId}`, {
		method: 'POST',
		body: formData
	});
	return response.json();
};
