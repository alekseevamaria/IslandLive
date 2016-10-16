<!--
black   gray    maroon  red orange yellow green     blue  dark-blue   purple  white
000     808080  800000  f00 ff7f00 ff0    008000    0ff   00f         800080  fff 
-->
<?php
    include 'render_template.php'; 
    render_template('defaultColor.php', array('COLOR' => 'black')); 
    render_template('defaultColor.php', array('COLOR' => 'white'));
    render_template('defaultColor.php', array('COLOR' => 'gray'));
    render_template('defaultColor.php', array('COLOR' => 'maroon'));
    render_template('defaultColor.php', array('COLOR' => 'red'));
    render_template('defaultColor.php', array('COLOR' => 'orange'));
    
    
    render_template('defaultColor.php', array('COLOR' => 'yellow'));
    render_template('defaultColor.php', array('COLOR' => 'green'));
    render_template('defaultColor.php', array('COLOR' => 'blue'));
    render_template('defaultColor.php', array('COLOR' => 'dark-blue'));
    render_template('defaultColor.php', array('COLOR' => 'purple'));
?>