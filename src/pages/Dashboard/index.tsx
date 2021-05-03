import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import {
    Container,
    Title,
    Form,
    Repositories,
    Error
} from './styles'

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [inputError, setInputError] = useState('');

    async function handleAddRepositories(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()

        if (!newRepo) {
            setInputError('Digite auto/nome do repositório')
            return
        }
        try {
            const response = await api.get(`repos/${newRepo}`)

            const repository = response.data

            setRepositories([...repositories, repository])
            setNewRepo('')
            setInputError('')
        } catch (err) {
            setInputError('Erro na busca por esse repositório')
        }
    }

    return (
        <Container>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no GitHub</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepositories}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>


            {
                inputError && <Error>{inputError}</Error>
            }

            <Repositories>
                {
                    repositories.map(repository => (
                        <Link
                            key={repository.full_name}
                            to={`/repositories/${repository.full_name}`}
                        >
                            <img
                               src={repository.owner.avatar_url}
                                alt={repository.owner.login}
                            />
                            <div>
                                <strong>{repository.full_name}</strong>
                                <p>{repository.description}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </Link>
                    ))
                }
            </Repositories>
        </Container>
    )
}

export default Dashboard