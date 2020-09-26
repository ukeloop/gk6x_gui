<template>
    <div>
        <main>
            <github-corner></github-corner>
            <div>
                <router-view/>
            </div>
        </main>
    </div>
</template>

<script>
import GithubCorner from './components/GithubCorner';

export default {
    components: {
        GithubCorner,
    },
    name: 'App'
}
</script>