import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';

/* HOC */
export default function dropdown(WrappedComponent) {
	return enhanceWithClickOutside(
		class extends Component {
			constructor(props) {
				super(props);
				this.state = {
					showDropdown: false,
				};
				this.openDropdown = this.openDropdown.bind(this);
				this.closeDropdown = this.closeDropdown.bind(this);
			}

			openDropdown() {
				this.setState({
					showDropdown: true,
				});
			}

			closeDropdown() {
				this.setState({
					showDropdown: false,
				});
			}

			handleClickOutside() {
				this.setState({
					showDropdown: false,
				});
			}

			render() {
				return (
					<WrappedComponent
						{...this.props}
						showDropdown={this.state.showDropdown}
						openDropdown={this.openDropdown}
						closeDropdown={this.closeDropdown}
					/>
				);
			}
		}
	);
}
