

<div class="date-selector border easy-margin">
    Date Selector
    <div class="">
        <div class="">
          <div>Start Date</div>
          <div>
            <input 
            type="date" 
            name="start" 
            id="start" 
            bind:value={start}
            max="{end}"/>
          </div>
        </div>
        <div class="">
          <div>End Date</div>
          <div>
            <input 
            type="date" 
            name="end" 
            id="end" 
            bind:value={end}
            min={start} />
          </div>
        </div>
      </div>
</div>


<script lang="">
  import {startDate, endDate} from '../stores.ts'
  let start = $startDate ? $startDate : undefined;
  let end = $endDate ? $endDate : getDateString();

  
  function getDateString() {
    const now = new Date(Date.now())
    const dateString = `${now.getFullYear()}-${`${(now.getMonth() + 1)}`.length == 2 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`}-${now.getDate()}`
    return dateString
  }


  $:setStart(start)
  $:setEnd(end)
	// @ts-ignore
	function setStart(start) {
		$startDate = start;
	}	
  // @ts-ignore
  function setEnd(end) {
    $startDate = '2023-07-13';
		$endDate = end;
	}



</script>


<style>

.date-selector {
        width: 40%;
    }

</style>