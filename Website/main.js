new Vue({
    el: '#app',
    data: {
        woodPellets: [],
        newWoodPellet: {
            id: 0,
            brand: '',
            price: 0,
            quantity: 0
        }
    },
    created() {
        this.getWoodPellets();
    },
    methods: {
        getWoodPellets() {
            axios.get('https://restwoodpellets2024.azurewebsites.net/api/woodpellet')
                .then(response => {
                    this.woodPellets = response.data;
                })
                .catch(error => {
                    console.error('Error fetching wood pellets:', error);
                });
        },
        addWoodPellet() {
            axios.post('https://restwoodpellets2024.azurewebsites.net/api/woodpellet', this.newWoodPellet)
                .then(response => {
                    this.woodPellets.push(response.data);
                    this.newWoodPellet = { id: 0, brand: '', price: 0, quantity: 0 }; // Reset form
                })
                .catch(error => {
                    console.error('Error adding wood pellet:', error);
                });
        },
        deleteWoodPellet(id) {
            axios.delete(`https://restwoodpellets2024.azurewebsites.net/api/woodpellet/${id}`)
                .then(response => {
                    this.woodPellets = this.woodPellets.filter(pellet => pellet.id !== id);
                })
                .catch(error => {
                    console.error('Error deleting wood pellet:', error);
                });
        }
    }
});