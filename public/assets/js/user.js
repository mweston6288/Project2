$(document).ready( () => {
    const search = $("form#game-search");
    const searchTerm = $("input#user-input");
    const options = $("button#options");
    let userID;

    $.get("/api/user_data").then( (data) => {
        userID = data.id;
    });

    const getByName = (searchTerm) => {
        let queryURL = "https://api.rawg.io/api/games/"+searchTerm.replace(/ /g, "-");
        $("#searchResults").empty();
        $("#suggestedResults").empty();
        $.get(queryURL)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games/" + searchResponse.id + "/suggested";
                $.get(queryURL)
                    .then((simResponse) => {
                        userMaker.createMainResult(searchResponse);
                        userMaker.createSubResult(simResponse);
                        makeNewSearchEvent();
                    });
            });
    };
    const getByDeveloper = (searchTerm) =>{
        let queryURL = "https://api.rawg.io/api/developers/" + searchTerm;
        $("#searchResults").empty();
        $("#suggestedResults").empty();
        $.get(queryURL)
            .then((searchResponse) => {
                queryURL = "https://api.rawg.io/api/games?developers=" + searchTerm;
                $.get(queryURL)
                    .then((gameSearch)=>{
                        userMaker.createDevResult(searchResponse);
                        userMaker.createSubResult(gameSearch);
                        makeNewSearchEvent();
                    });
            });
    };

    const addToWishlist = (gameID) => {
                const newGame = {
                    id: gameID,
                    userID: userID,
                };
                $.post("/api/user/game", newGame).then($.post("/api/wishlist", newGame));
            };
    const makeNewSearchEvent =() => {
        const newSearch = $("a.newSearch");
        const devButton = $("a.developer");
        const wishlistButton = $("button.wishlist-add");
        newSearch.on("click", (event) => {
            getByName(event.toElement.id);
        });
        devButton.on("click", (event)=>{
            getByDeveloper(event.toElement.id);
        });
        wishlistButton.click((event)=>{
            addToWishlist(event.toElement.id);
        });
    };
    search.on("submit", (event) => {
        event.preventDefault();
        const searchData = {
            searchTerm: searchTerm.val().trim(),
        };
        if (!searchData.searchTerm) {
            return;
        }
        getByName(searchData.searchTerm);
        searchTerm.val("");
    });
    options.click((event)=>{
        event.preventDefault();
        window.location.assign("/options");
    });
});