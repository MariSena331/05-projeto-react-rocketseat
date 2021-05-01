import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Container, Title, Form, Repositories } from './styles'

const Dashboard: React.FC = () => {
    return (
        <Container>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore repositórios no GitHub</Title>

            <Form action="">
                <input placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img
                       src="https://avatars.githubusercontent.com/u/35273542?s=400&u=b752b187009348e33521a6bfa0c606339541c042&v=4"
                        alt="Mariana Sena"
                    />
                    <div>
                        <strong>gravateca/index</strong>
                        <p>Cadastre seus livros aqui!</p>
                    </div>

                    <FiChevronRight size={20} />
                </a>
            </Repositories>
        </Container>
    )
}

export default Dashboard