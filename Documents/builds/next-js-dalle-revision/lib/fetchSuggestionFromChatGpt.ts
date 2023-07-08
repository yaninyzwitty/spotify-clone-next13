const fetchSuggestionFromChatGpt = () =>
    fetch(`/api/suggestion`, {
        cache: "no-store",
    }).then((res) => res.json())



export default fetchSuggestionFromChatGpt;