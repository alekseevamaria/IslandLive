<?php
/*
 * example:
 * render_template('form.php', array('FORM_ID' => 'topForm'));
 * after that in 'form.php' you can use variable named FORM_ID (value=topForm)
*/

function render_template($pathToTemplate, $vars)
{
    extract($vars);
    include $pathToTemplate;
}