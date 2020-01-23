<template>
    <div>
        <comp-feature />
        <comp-content />
    </div>
</template>

<script>
import compFeature from './Feature'
import compContent from './Content'

export default {
    components: {
        compFeature,
        compContent
    }
}
</script>