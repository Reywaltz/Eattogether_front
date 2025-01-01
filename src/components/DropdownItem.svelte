<script lang="ts">
	import { DropdownItem, Checkbox, Avatar } from "flowbite-svelte";

    let {id, image, name} = $props()

    // let isChecked = $state(false)
    

</script>

<DropdownItem id={id} class="flex items-center text-base font-semibold gap-2" >
    <Checkbox>
        <Avatar src={image} size="xs"/>{name}
    </Checkbox>
</DropdownItem>

<style></style>