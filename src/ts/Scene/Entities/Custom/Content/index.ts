import * as GLP from 'glpower';

import contentFrag from './shaders/content.fs';
import { globalUniforms } from '~/ts/Globals';
import { hotGet, hotUpdate } from '~/ts/libs/glpower_local/Framework/Utils/Hot';
import { TurnTable } from '~/ts/Scene/Components/TurnTable';

export class Content extends GLP.Entity {

	constructor() {

		super();

		const mat = this.addComponent( "material", new GLP.Material( {
			name: "content",
			type: [ "deferred", "shadowMap" ],
			uniforms: GLP.UniformsUtils.merge( globalUniforms.time, globalUniforms.resolution ),
			frag: hotGet( 'contentFrag', contentFrag )
		} ) );

		this.addComponent( "turnTable", new TurnTable( - 3 ) );

		if ( import.meta.hot ) {

			import.meta.hot.accept( "./shaders/content.fs", ( module ) => {

				if ( module ) {

					mat.frag = hotUpdate( 'content', module.default );
					mat.requestUpdate();

				}

			} );

		}

	}

	protected updateImpl( event: GLP.EntityUpdateEvent ): void {

		this.position.x = Math.sin( event.time * 3.0 ) * 3.0;
		this.position.y = Math.sin( event.time * 7.0 ) * 3.0;

	}

}
