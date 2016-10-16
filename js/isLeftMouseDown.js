function isLeftMouseDown(e)
{
    return (!e.which && e.button & 1 || e.which === 1);
}