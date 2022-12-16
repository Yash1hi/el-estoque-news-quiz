import { request, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getQuizzes = async () => {
    const query = gql `
    query MyQuery {
        quizzesConnection {
          edges {
            node {
              authors {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              featuredImage {
                url
              }
              accentColor {
                hex
              }
              lighterColor {
                hex
              }
              mainColor {
                hex
              }
              questions {
                answers
                blurb
                correctAnswer
                graphic {
                  url
                }
              }
              graphicsAuthors {
                ... on Author {
                  id
                  name
                }
                name
              }
            }
          }
        }
      }
    `
    const result = await request(graphqlAPI, query);

    return result.quizzesConnection.edges;
}

export const getQuizDetails = async (slug) => {
    const query = gql `
        query getQuizDetails($slug: String!) {
            quiz(where: { slug: $slug }) {
                authors {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                featuredImage {
                    url
                }
                accentColor {
                    hex
                }
                lighterColor {
                    hex
                }
                mainColor {
                    hex
                }
                questions {
                    question
                    answers
                    blurb
                    correctAnswer
                    graphic {
                        url
                    }
                }
                graphicsAuthors {
                  ... on Author {
                    id
                    name
                  }
                  name
                }
            }
        }
    `
    const result = await request(graphqlAPI, query, { slug });

    return result.quiz;
}