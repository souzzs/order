const URL_API = "https://api.spotify.com/v1";

// Dados para montar a url de solicitação de autorização
const CLIENT_ID = "58b64a6855c74847b3984cab76959270";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

// Redireciona o usuário para a página onde ele autoriza a permissão do uso de dados e retorna informações sobre o token de autorização.
export const REDIRECT_URL_TOKEN = () => {
  window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};

// Retorna a url e o options para o fecth.
export const GET_USER = () => {
  return {
    url: URL_API + "/me",
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  };
};

export const GET_PLAYLISTS = (id) => {
  return {
    url: URL_API + `/users/${id}/playlists`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  };
};

export const GET_PLAYLIST = (id) => {
  return {
    url: URL_API + `/playlists/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  };
};

export const GET_MUSICS = (dataIds) => {
  return {
    url: URL_API + `/tracks?market=BR&ids=${dataIds}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    },
  };
};

export const PUT_ORDER_PLAYLIST = (idPlaylist, uris, data) => {
  return{
    url: URL_API + `/playlists/${idPlaylist}/tracks?uris=${uris}`,
    options: {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }, 
      data: JSON.stringify(data)
    }
  }
}
