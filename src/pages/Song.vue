<template>
    <h2>{{ song.title }}</h2>
</template>
<script>
import gql from "graphql-tag";
export default {
    props: ['title', 'id'],
    data(){
        return {
            song: {},
            song_id: this.id
        }
    },
    created(){
        this.$apollo.query({
            query: gql`
                query song($id: ID!){
                    song(id: $id){
                        title
                        lyrics
                    }
                }
            `,
            variables: {
                id: this.song_id
            }
        })
        .then(data => {
            this.song = data.data?.song
        })
        .catch(err => {
            console.log(err)
        })
    },
}
</script>