<script>

    import { setupRoles, INTERMEDIATE } from '../lib/Database'
    import { Button, Scaffold, Dropdown, IconButton } from 'saraui'

	let counter = 0

	function increase() {
		counter += 1
	}

    function getRoles() {
        setupRoles(11, INTERMEDIATE)
    }


</script>

<Button color="primary">Click I</Button>

<button on:click={increase}>Increment from {counter}</button>
<button on:click={getRoles}>Get Roles</button>

<Dropdown>
    <IconButton tooltip="?">
      <span class="i-mdi-help"></span>
    </IconButton>
    <div slot="content" class="card p-2 shadow-md">
      Hello, world! 👋🏼
    </div>
</Dropdown>

