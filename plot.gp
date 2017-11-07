unset xtics
unset ytics
unset border
unset key
unset title
set lmargin at screen 0
set tmargin at screen 0
set rmargin at screen 1
set bmargin at screen 1
#set palette rgbformulae 34,35,36
#set palette rgbformulae 30,31,32
set palette rgbformulae 33,13,10
#set palette defined ( 0 "green", 1 "orange", 2 "red" )
#set palette model CMY rgbformulae 7,5,15
set xrange [0:4095]
set yrange [0:4096]
set cbrange [1:2]
set terminal png size 4096,4096 transparent truecolor
set output "world.png"
plot "world.txt" using 1:(4096-$2):($3) with dots palette

