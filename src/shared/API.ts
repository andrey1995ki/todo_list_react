import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://6172783961ed900017c408d1.mockapi.io/api/v1/'
})

export const taskAPI ={
    getTaskList(){
        return instance
            .get('/taskList')
    }
}