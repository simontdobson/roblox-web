<template>
    <div class="container">
        <h2>Sessions Today</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Process Id</th>
                <th>Started</th>
                <th>Stopped</th>
                <th>Seconds</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in sessions" :key="item.pid">
                  <td>{{ item.pid }}</td>
                  <td>{{ item.started }}</td>
                  <td>{{ item.ended }}</td>
                  <td>{{ item.seconds }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Sessions',
        props: ['sessions']
     }
</script>