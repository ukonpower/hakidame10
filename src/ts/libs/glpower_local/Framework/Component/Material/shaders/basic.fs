#include <common>
#include <packing>
#include <frag_h>

void main( void ) {

	#include <frag_in>

	outColor = vec4(vVelocity * 1.0, 1.0, 1.0 );
	
	#include <frag_out>

} 